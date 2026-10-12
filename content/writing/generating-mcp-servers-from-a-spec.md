---
title: "From YAML to MCP server: generating MCP servers from a spec"
description: "Instead of hand-writing an MCP server for every API, describe it in a YAML file and generate it, with validation, authentication and logging included. Here are the design decisions that matter most."
date: 2026-10-10
category: Agentic Systems & MCP
tags: [mcp, python, platform-engineering, observability, security]
draft: true
---

The Model Context Protocol (MCP) gives AI assistants a standard way to find and call tools. That solves half the problem. The other half is the server: someone still has to write code for every API the assistant needs, covering input checks, authentication, error handling and logging. Then they write it again for the next API.

There is a simpler approach. Describe the server in a YAML file, and let a generator write the code. This article explains how that works and which design decisions matter most.

## MCP in one minute

An MCP server offers three kinds of capability:

| Capability | What it is | Example |
| --- | --- | --- |
| **Tools** | Actions the AI can take, with typed inputs | `get_ticket(ticket_id)` |
| **Resources** | Data the AI can read | A runbook, or a live status page |
| **Prompts** | Reusable instructions for the AI | "Summarise this change" |

An AI client connects to the server, either locally (stdio) or over the network (Streamable HTTP), and asks what it offers. The server replies with a full list of tools and their inputs, so nobody has to read API documentation on the AI's behalf.

## Step 1: describe the tool in YAML

A tool that calls an HTTP API needs only a few lines:

```yaml title="spec.yaml (example)"
tools:
  - name: get_ticket
    description: Fetch a ticket by ID
    type: api
    input_schema:
      type: object
      properties:
        ticket_id: { type: string }
      required: [ticket_id]
    api:
      method: GET
      base_url_env: TICKETS_API_URL
      path: /tickets
      query_params:
        id: "{{ input.ticket_id }}"
```

The YAML file is the single source of truth. To change the server, you change this file and generate again.

## Step 2: generate real code, not runtime templates

`{{ input.ticket_id }}` looks like a template that gets filled in on every request. In this design it isn't. The generator turns it into plain Python once, at generation time:

```python title="tools/get_ticket.py (generated)"
async def get_ticket(ticket_id: str) -> dict[str, Any]:
    validate_input(INPUT_SCHEMA, {"ticket_id": ticket_id})
    result = await call_api(
        method="GET",
        base_url_env="TICKETS_API_URL",
        path="/tickets",
        query_params={"id": ticket_id},
        auth_profile="default",
        timeout=20.0,
    )
    return sanitize_output(result)


def register(mcp: Any) -> None:
    mcp.tool(name="get_ticket")(get_ticket)
```

**Why this matters:** the result is ordinary code that anyone can read, test and debug. If a placeholder is wrong, generation fails straight away, instead of a request failing in production later.

Alongside the tools, the generator produces everything else a server needs: configuration, authentication, an HTTP client, tests, a Dockerfile and documentation.

## Step 3: check the spec before generating anything

The spec is checked first using Pydantic models. The checker lists every problem at once instead of stopping at the first one. Typical rules:

- Tool names use `snake_case`.
- Input schemas are valid JSON Schema.
- Authentication settings are complete.
- **No passwords or keys in the file.** The spec refers to secrets by environment variable name only.

## Step 4: regenerate without losing work

A generator is only useful if it can be run again safely. Two rules make that work:

1. **Custom code is never overwritten.** Some tools need real logic, such as uploading a file or querying a database. That code lives in a protected folder (`app/custom/`) that regeneration never touches.
2. **Secrets are never overwritten.** The real `.env` file is left alone. The generator only writes a `.env.example` listing the variables the spec needs.

## Authentication: the hard part

Speaking MCP is the easy part. Signing in to each upstream API is where most of the complexity is. Five common patterns cover most cases:

| Pattern | When to use it |
| --- | --- |
| No auth | Open endpoints |
| Bearer token | A fixed token stored in an environment variable |
| API key | A key sent in a header or query parameter |
| Username and password | HTTP Basic authentication |
| Token provider | Log in once, then reuse the token until it expires |

The **token provider** does the most work. It logs in, reads when the token expires, keeps the token in memory and fetches a new one before the old one runs out. The token stays on the server and is never shown to the AI.

Each tool can also **use its own authentication**. This matters because one server often talks to several services, and they rarely sign in the same way.

## Logging and monitoring from day one

Every generated server gets the same monitoring, so running ten servers is no harder than running one:

- **A request ID** that follows each request through every log line.
- **Structured JSON logs** for each step: tool started, tool finished, upstream API called, error.
- **Health checks** at `/health` and `/ready`.
- **Optional metrics and tracing**, using Prometheus and OpenTelemetry.
- **Automatic hiding of secrets** in logs.

A single log line looks like this:

```json
{"event": "tool.success", "tool": "get_ticket", "duration_ms": 42,
 "request_id": "mcp-…", "upstream": {"status_code": 200, "latency_ms": 31}}
```

## Managing many servers

Once there are several servers, a small management service helps. It starts, stops and restarts servers, shows whether each one is healthy, and forwards tool calls, so the AI client doesn't need to know where each tool lives. A simple web page on top makes it easy to browse tools, try them out and read logs.

## Lessons for anyone building this

- **Describe first, code second.** Most tools are thin wrappers around an API, so make those declarative and keep a way to add custom code for the rest.
- **Treat the generator like a compiler.** Catch mistakes at generation time, and produce code a person can read.
- **Build in monitoring from the start.** Request IDs, structured logs and secret hiding are cheap to generate and painful to add later.
- **Label tools by risk.** MCP lets tools be marked as read-only or as changing something. AI clients can use that to ask a person to confirm before anything changes.

## What could come next

Promising next steps include creating tools directly from OpenAPI or Postman files, a shared catalogue where teams can publish and find servers, and access control over which callers may use which tools. The [NetPilot](/projects/netpilot/) project on this site explores that last idea, using permission levels and an audit log for AI tool calls.
