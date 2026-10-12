---
title: MoviePicker
tagline: A group movie picker. Everyone in a session swipes on films, and when enough people like the same one, every device shows the match at the same moment.
kind: Team project · CSSE6400 Software Architecture, UQ
period: Feb – May 2025
team: Team of six
problem: Choosing a film as a group means scrolling across several streaming services and rarely agreeing. The system has to collect everyone's choices and announce a match to every device at once.
contribution: Built much of the React frontend, including sign-up and login, session creation with PIN sharing, joining a group, the swiping screen and the match overlay, and co-wrote the architecture decision records for those parts.
stack: [React, Flask, PostgreSQL, WebSockets, AWS ECS, AWS Lambda, SNS, Terraform, k6]
evidence: private-repo
featured: true
order: 4
diagram:
  title: How a match reaches every device
  caption: A simplified view of the event-driven design the team chose. A match event is published once and pushed to every client in the session over a WebSocket.
  steps:
    - label: React frontend
      note: Users swipe to like or dislike a film
    - label: Flask API on ECS
      note: Records likes; a film matches when likes reach the session's threshold
      emphasis: true
    - label: Emit Lambda + SNS
      note: The match event is published once
    - label: Lambda listener
      note: Looks up the film and finds the session's connections
    - label: WebSocket push
      note: Every device in the session shows the match
  side:
    - from: 2
      label: PostgreSQL (RDS)
      note: Users, sessions, likes, matches
---

## Overview

MoviePicker is a web app for choosing a film as a group. Someone creates a session, chooses genres and streaming platforms, and shares a short PIN. Everyone who joins swipes right or left on films pulled from The Movie Database (TMDB). Once enough of the group likes the same film, every device in the session shows the match.

It was built by a team of six for the University of Queensland course CSSE6400 Software Architecture.

## Problem

The hard part of MoviePicker isn't the swiping. It's announcing a match to every person at the same moment, with several sessions running at once, on infrastructure that can scale.

## My role

My work was mainly on the **React frontend** and on the decisions behind it:

- The sign-up and login pages, including the redirect from sign-up back to login and a consistent header.
- **Session creation:** choosing genres and platforms, generating and displaying the session PIN, and the flow for sharing it.
- **Joining a group** with a PIN, with back navigation and fixes to the flow between screens.
- The **swiping screen**, managing the loaded films, the current film, likes and loading and error states.
- The **match overlay** that appears when the group agrees on a film.

I also wrote or co-wrote the architecture decision records (ADRs) for the matching UI components, session creation and the swiping screen.

## Technical approach

The team recorded its significant decisions as ADRs. The ones that shape the system are:

- **Event-driven architecture.** A match is an event that has to reach many clients at once, so the system publishes match events instead of having each client ask whether anything has changed.
- **WebSockets rather than polling.** Polling would add delay and send wasted requests. Instead, each client keeps a persistent connection through an AWS WebSocket API Gateway, and a Lambda function pushes match results using the connection IDs.
- **Lambda with SNS.** When the API detects a match, a Lambda function publishes the event to an SNS topic. A listener Lambda then looks up the film from TMDB and notifies the session.
- **Short-lived, alphanumeric session PINs.** Using letters as well as digits makes PINs harder to guess, and PINs expire after five minutes.
- **Static frontend hosting on S3**, with the Flask API running in containers on ECS behind a load balancer, with autoscaling.

## Testing and deployment

The infrastructure is defined in Terraform: an ECS cluster and service with autoscaling, a load balancer, RDS PostgreSQL, Lambda functions, an SNS topic and an ECR repository. A deploy script builds the whole stack. The repository also includes load tests written with k6 to check how the system scales.

## Results and limitations

The team deployed the application to AWS and demonstrated its features end to end. One known gap was that Google sign-in didn't work fully on the deployed version, and the team chose to leave it unfinished rather than ship it broken.

The repository belongs to the course and is private, so this page summarises the design rather than linking to the code.

## What I learned

Writing an ADR before building a screen made the frontend easier to reason about. Decisions like *"how does the swiping screen hear about a match?"* had already been answered at the architecture level, so the component only needed to listen for an event.
