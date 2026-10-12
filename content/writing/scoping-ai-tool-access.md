---
title: "Read, plan, mutate: scoping what an AI assistant can call"
description: "Notes from building NetPilot: why every tool declares a permission scope, why the audit log can't be skipped, and why the scope for changing things exists before any tool uses it."
date: 2026-10-10
category: Agentic Systems & MCP
tags: [mcp, python, fastapi, security]
draft: true
---

> **Draft for Gaurika to review.** This starter article is built only from the NetPilot repository's code and documentation. Edit it into your own words, then set `draft: false` to publish it.

When people talk about giving an AI assistant access to infrastructure, the conversation tends to start with prompts. While building [NetPilot](/projects/netpilot/), I found that the more useful starting point is the tool layer. The question is what the assistant is *able* to call, and what record exists afterwards.

## Three scopes, declared up front

Every tool in NetPilot declares the minimum scope it needs:

| Scope | Meaning |
| --- | --- |
| `read` | Inspect state |
| `plan` | Compute a proposed change without applying it |
| `mutate` | Apply a change |

The first line of every handler is the check:

```python
def config_validate(ctx: CallerContext, node_id: int) -> ConfigValidateResult:
    require_scope(ctx, REQUIRED_SCOPE)
    ...
```

No tool uses `mutate` yet. The scope exists anyway, so the permission model won't need to change shape when the first mutating tool arrives.

## The audit log is a context manager

The audit record is written in a `finally` block, so a tool can't succeed or fail without leaving a line behind:

```python
@contextmanager
def audit_call(tool, scope_required, arguments):
    record = AuditRecord(tool=tool, scope_required=scope_required, arguments=arguments)
    try:
        yield record
    except Exception as exc:
        record.status = "error"
        record.error = str(exc)
        raise
    finally:
        logger.info(record.to_json())
```

That makes the question *"what did the AI layer actually do?"* answerable from the log alone.

## What's next

The next milestone adds one mutating tool, behind a human-approval step that holding `mutate` alone won't satisfy.
