---
title: AI Data Analyst
tagline: Upload a CSV and get KPIs, charts and plain-English insights. pandas does every calculation, and a local language model only explains the results.
kind: Personal project
period: Jul 2026
problem: Language models are good at explaining data and unreliable at arithmetic. If a model is asked to analyse a raw spreadsheet, it can produce confident numbers that are simply wrong.
contribution: Built the full stack, including the Flask API, pandas analysis pipeline, prompt design, safety checks and caching, the React dashboard, JWT authentication and the Docker Compose setup.
stack: [Python, Flask, pandas, Ollama, LangChain, FAISS, React, Tailwind CSS, PostgreSQL, Docker Compose]
repo: https://github.com/gaurikadiwan/AI-Data-Analyst
evidence: public-repo
featured: true
order: 2
diagram:
  title: Data flow for one analysis
  caption: The language model only ever receives a small, pre-computed JSON summary. It never sees the raw file or does any arithmetic.
  steps:
    - label: CSV upload
      note: Stored per user, behind JWT auth
    - label: pandas pipeline
      note: Column detection, KPIs, grouped metrics, data-quality profile
      emphasis: true
    - label: Structured JSON
      note: Trimmed KPIs and top groups only
    - label: Local LLM via Ollama
      note: TinyLlama, Phi-3 or Qwen2.5-Coder
    - label: Checked response
      note: Code-like output is rejected and retried, with a fallback
  side:
    - from: 2
      label: Charts
      note: matplotlib, from the same aggregates
---

## Overview

AI Data Analyst is a full-stack web application. You upload a CSV, and it returns an immediate profile of the data, a set of KPIs, charts and natural-language insights. You can also ask follow-up questions in plain English. Everything runs locally: the language models are served by Ollama, so no data is sent to an external API.

## Problem

The obvious way to build "chat with your spreadsheet" is to give the data to a model and ask it questions. That fails in a predictable way. Small local models in particular are poor at arithmetic and will invent plausible totals, averages and trends.

## Why it matters

Analytics is a domain where a fluent wrong answer is worse than no answer. Separating *computation* from *interpretation* is a simple architectural decision that removes a whole class of errors. It is also a pattern that carries over to other places language models are added to existing systems.

## My role

This is a solo project. I built the backend, the frontend and the local container setup.

## Technical approach

**pandas calculates, the model explains.** Every number comes from pandas. The pipeline detects useful columns, then computes KPIs, grouped metrics such as totals by region, department and month, summary statistics, and a data-quality profile covering missing values, duplicates and outliers by the IQR rule. The model receives only a trimmed JSON summary of those results and is asked to return insights and recommendations in a fixed JSON shape.

**Guarding the output.** Responses are checked before they are returned. If a model replies with code or pandas expressions instead of an explanation, the call is retried once and then replaced with a fallback. If the recommendations aren't valid JSON, the prompt is retried with a stricter instruction.

**Fast paths and caching.** Common questions, such as top regions, trends and distributions, are answered directly from cached aggregates without calling a model at all. Full analyses are cached per file, and model responses are cached per input and question.

**Comparing models.** The app can switch between TinyLlama, Phi-3 and Qwen2.5-Coder, and it can run the same question across models to compare their answers and latency.

**Groundwork for retrieval.** The analysis step also builds a FAISS index over a selection of high-signal rows using `all-MiniLM-L6-v2` sentence embeddings, and caches it by file hash. Using that index to answer row-level questions is not wired into the Q&A path yet.

## Technology choices

- **Ollama with small local models.** No API keys and no running cost, and the data stays on the machine. The trade-off is weaker reasoning, which is exactly why the model isn't asked to calculate anything.
- **Flask with a service layer.** Routes stay thin, while analysis, AI orchestration, charts and authentication each live in their own service.
- **React, Vite and Tailwind.** A dashboard with upload, KPI cards, charts, Q&A, history and PDF export.
- **Docker Compose.** Starts PostgreSQL, the Flask API and the frontend dev server together.

## Results

The project demonstrates the architecture working end to end, from upload through analysis, Q&A and PDF export. The KPI and grouping logic is tuned for sales-style datasets with regions, departments and dates, and other shapes of data get a more generic profile.

## What I'd improve

The next steps are unit tests around the analysis functions, using the retrieval index in Q&A, chunked processing for files larger than memory, and moving caches into a persistent store.
