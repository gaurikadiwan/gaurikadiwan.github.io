---
title: Queensland Energy Demand Forecasting
tagline: Research forecasting pipelines combining Australian weather and electricity data, with more than five models benchmarked over a decade of Queensland energy data.
kind: Undergraduate research · The University of Queensland
period: Jul 2024 to Jul 2025
problem: Electricity demand depends heavily on weather, and better short-term forecasts support more reliable and sustainable energy planning.
contribution: Developed the Python forecasting pipelines and reproducible data-processing workflows, and benchmarked the forecasting models.
stack: [Python, Time-series forecasting, Data pipelines, Model evaluation]
evidence: summary
featured: true
order: 3
diagram:
  title: Research workflow
  caption: A simplified view of the workflow. The source code and datasets are not public.
  steps:
    - label: Weather + electricity data
      note: Australian datasets, 10+ years for Queensland
    - label: Reproducible processing
      note: Cleaning and aligning the series
    - label: Benchmark 5+ models
      note: Same data, same evaluation
      emphasis: true
    - label: Compare accuracy
      note: 15% improvement in demand-forecast accuracy
---

## Overview

During a year as an undergraduate researcher at the University of Queensland, I worked on forecasting electricity demand from Australian weather and electricity datasets, in support of sustainable energy research.

## Problem

Electricity demand moves with the weather, through heating and cooling load and seasonal patterns. Forecasts that use weather data well help with planning and with integrating variable renewable generation.

## My role and approach

- Developed Python forecasting pipelines that combine Australian weather and electricity datasets.
- Built reproducible data-processing workflows so experiments could be rerun on the same inputs.
- Benchmarked more than five forecasting models across more than ten years of Queensland energy data.

## Results

The work improved demand-forecasting accuracy by **15%**.

## Engineering takeaways

Much of the engineering in research forecasting is in the pipeline rather than the model. Comparing more than five models fairly requires data processing that is reproducible, so that every model is evaluated on the same inputs in the same way.

## Limitations of this write-up

This summary is based on my resume. The research code and data aren't public, so this page deliberately doesn't describe specific models, features or evaluation metrics.
