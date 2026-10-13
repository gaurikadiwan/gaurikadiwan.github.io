---
title: Queensland Energy Demand Forecasting
tagline: Honours research modelling how temperature drives peak electricity demand across South-East Queensland substations, using public Bureau of Meteorology and Energex data.
kind: Honours research · The University of Queensland
period: Jul 2024 to Jul 2025
problem: Regional forecasts average away local behaviour. Grid planners need to know where and when heat pushes demand up, and how high it can go on the hottest days.
contribution: Built the Python data pipeline, engineered the weather and demand features, and developed, validated and compared five modelling approaches across five substation feeders.
stack: [Python, Time-series forecasting, SARIMAX, Harmonic regression, Quantile regression, Random forest, K-means clustering, STL decomposition]
evidence: summary
featured: true
order: 3
diagram:
  title: Research pipeline
  caption: From public weather and substation data to day-ahead forecasts and planning insights.
  steps:
    - label: BoM + Energex data
      note: Daily max temperature; half-hourly substation demand
    - label: Clean and align
      note: Daily peaks, gap filling, outlier checks
    - label: Engineer features
      note: Cooling degree days, anomalies, lags
    - label: Model and validate
      note: Five approaches, time-ordered testing
      emphasis: true
    - label: Planning insights
      note: Day-ahead forecasts and extreme-peak bounds
---

## Overview

Australia's move to a net-zero energy system makes it more important to understand how weather drives electricity use. My honours thesis, *Modelling Spatio-Temporal Correlation in Future Weather Uncertainty*, studied how **daily maximum temperature drives peak electricity demand** at individual substations across South-East Queensland. The work isolated the effect of temperature, measured how it differs from place to place, and built forecasting models that grid operators could use.

## The problem

Most demand forecasts work at the level of a whole state or region. That hides big local differences: a dense urban area and a small rural feeder respond to the same heatwave very differently. Simple models that assume demand rises in a straight line with temperature also miss the real behaviour, where demand stays flat on mild days and then surges once air-conditioning switches on.

## Data and pipeline

The analysis combined two public data sources:

- **Electricity demand from Energex**, recorded every half hour at zone-substation level.
- **Weather from the Australian Bureau of Meteorology**, using gridded daily maximum temperatures matched to each location.

I built a pipeline to turn these into a clean, model-ready daily dataset:

- **Time alignment.** Half-hourly demand aggregated to daily peak and average demand, on a single time zone, and paired with each day's temperature.
- **Data quality.** Short gaps filled by interpolation, longer gaps removed and logged, and outliers flagged with a rolling 30-day z-score. Genuine heatwave spikes were kept.
- **Feature engineering.** Cooling degree days, temperature anomalies against the long-term norm, and lagged demand and temperature (one day and one week back) to capture persistence.
- **Trend and seasonality.** STL decomposition and autocorrelation checks confirmed a strong annual cycle and daily and weekly persistence, which guided the choice of models.

K-means clustering of the daily demand shapes revealed distinct patterns: broad afternoon peaks on hot weekdays, single evening peaks in milder seasons, and flatter weekend profiles.

## Modelling approach

I developed and compared five approaches, each chosen to answer a different question:

| Approach | What it captures |
| --- | --- |
| Linear regression | A simple, interpretable baseline for demand per °C |
| Harmonic regression | Annual seasonality with sine and cosine terms, plus a temperature "knee" |
| SARIMAX | Day-to-day momentum in demand, with temperature as an external driver |
| Random forest | Non-linear interactions between features |
| Quantile regression | High-percentile demand on extreme days, not just the average |

The models were evaluated on a held-out later period, with rolling time-ordered cross-validation so the test data never leaked into training. Each was checked with MAE, RMSE and MAPE, residual diagnostics and overfitting checks.

## Results

- **A clear heat threshold.** At most sites, demand stayed roughly flat between about 22 and 28 °C, then rose sharply above 30 °C as cooling load took over. Modelling temperature with a breakpoint near 25 °C captured this better than a straight line.
- **Strong seasonal fit.** Harmonic regression explained **82 to 84%** of the variance in daily peak demand.
- **Accurate day-ahead forecasts.** Adding short-term momentum with SARIMAX brought forecast error at the major feeders down to around **5 to 6% MAPE**, a **20 to 30% reduction in error** compared with harmonic regression alone.
- **Local differences matter.** Heat sensitivity varied widely, from almost none on a small rural feeder to the steepest response in the densest urban area. One industrial site switched between two distinct load levels, and modelling those operating regimes reduced its forecast error by about **15%**.
- **Planning for extremes.** Quantile regression estimated the upper range of demand on very hot days, which is what operators need for setting reserve margins.

## Why it matters

The results point to practical uses: SARIMAX for operational day-ahead forecasting, harmonic regression for transparent long-term "what if temperatures rise by 1 to 2 °C" scenarios, and quantile estimates for extreme-peak preparedness. Knowing which areas are most heat-sensitive can also help prioritise network upgrades, batteries and demand management.

## Engineering takeaways

Most of the work was in the pipeline, not the models. Comparing five approaches fairly across sites depended on clean, aligned data, consistent features and an evaluation process that respected time order. The natural next step is to scale the same pipeline to many more feeders with automated model fitting and validation.
