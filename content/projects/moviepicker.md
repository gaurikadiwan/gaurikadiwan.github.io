---
title: MoviePicker
tagline: A group movie picker. Everyone in a session swipes on films, and when enough people like the same one, every device shows the match at the same moment.
kind: Team project · Software architecture
period: Feb to May 2025
problem: Choosing a film as a group means scrolling across several streaming services and rarely agreeing. The system has to collect everyone's choices and announce a match to every device at once.
contribution: Built key React user flows (authentication screens, session creation and PIN sharing, PIN-based joining, the swiping screen and the match overlay), connected them to the team's Flask API, and co-authored the architecture decision records for the matching UI, session creation and swiping screen.
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

MoviePicker is a web app for choosing a film as a group. Someone creates a session, chooses genres and streaming platforms, and shares a short PIN. Everyone who joins swipes right or left on films pulled from The Movie Database (TMDB). Once enough of the group likes the same film, every device in the session shows the match at the same moment.

## The engineering problem

The hard part of MoviePicker isn't the swiping. It's announcing a match to every person in a session at once, with many sessions running in parallel, on cloud infrastructure that can scale. That requirement shaped the whole architecture: an event-driven backend, real-time connections to every client, and a frontend built to react to events rather than repeatedly ask the server for updates.

## My role

MoviePicker was built collaboratively, with team members owning different parts of the frontend, backend and infrastructure. My contributions centred on the React frontend and the architectural decisions behind it. Working with the team, I helped implement the key user flows and document why they were designed the way they were.

- **Authentication and user flows.** Contributed to the React sign-up and login interfaces, including the redirect from sign-up back to login and a consistent application header.
- **Session creation and sharing.** Implemented the frontend for selecting genres and streaming platforms, creating a session, generating and displaying the session PIN, and sharing it with other participants.
- **Group joining.** Developed the PIN-based joining flow, including navigation between screens and fixes to the user journey.
- **Collaborative film selection.** Contributed to the swiping interface: loading films, tracking the current film, handling likes, and managing loading and error states.
- **Match experience.** Implemented the match overlay that appears when the group agrees on a film.
- **Integration with backend services.** Connected the joining and swiping screens to the team's Flask REST API, for example looking up a session by its PIN and loading the film list for a session, using environment-based API configuration so the same build works locally and in the cloud.
- **Software architecture.** Co-authored three architecture decision records (ADRs), covering the matching UI components, session creation and the swiping screen.

## Architecture decisions I co-authored

The team recorded every significant decision as an ADR: the context, the options, the decision and its consequences. The three I worked on define how the frontend is structured and how it plugs into the real-time backend.

**Matching UI components (ADR 003).** A match can arrive at any moment while someone is swiping, and every user in the session must see the same thing. The decision was to split the match experience into two components with clear responsibilities: `MatchOverlay`, which announces the match and shows the film's details, and `PostMatchOptions`, which handles what the user does next, such as keeping swiping or viewing matches. Separating notification from follow-up actions keeps each component simple and reusable, at the cost of coordinating state between them. That trade-off is recorded in the ADR.

**Session creation (ADR 004).** Creating a session involves several user preferences, a REST call to create the session, a unique PIN, and a real-time connection for later updates. The component keeps local UI state separate from session data, uses one central mapping between the genre and platform names users see and the IDs the TMDB API expects, and reads its API endpoints from environment configuration. The ADR notes the main risk: frontend and backend IDs must stay in sync.

**Swiping screen (ADR 007).** This is the core of the app. The screen loads films in batches based on the session's preferences, keeps a buffer of pre-loaded films so swiping isn't interrupted, and listens on the WebSocket connection for match events. It explicitly handles loading, empty and error states, including fallbacks for missing images. The ADR also records known trade-offs and mitigations: many separate pieces of component state, the memory used by pre-loaded films, and the need for WebSocket reconnection logic.

## How the system works

The diagram above shows the path of a match through the system the team designed:

- **Event-driven architecture.** A match is treated as an event to be published, not something each client has to poll for. This keeps the parts of the system decoupled, and lets many sessions run at the same time.
- **WebSockets rather than polling.** Each client holds a persistent connection through an AWS API Gateway WebSocket API. When a match happens, a Lambda function pushes the result to every connection in that session. This avoids the delay and wasted requests that polling would cause.
- **Lambda with SNS.** When the Flask API detects that likes for a film have reached the session's threshold, an emit Lambda publishes the event to an SNS topic. A listener Lambda looks up the film from TMDB and notifies the session's connections.
- **Short-lived alphanumeric PINs.** Mixing letters and digits makes session PINs harder to guess, and they expire after five minutes.
- **Cloud deployment.** The React frontend is hosted as a static site on S3. The Flask API runs in containers on ECS behind a load balancer, with autoscaling, and stores users, sessions, likes and matches in PostgreSQL on RDS.

## Testing and deployment

The team defined the infrastructure as code in Terraform: the ECS cluster and service with autoscaling, a load balancer, RDS PostgreSQL, Lambda functions, an SNS topic and an ECR container registry. A single deploy script builds and provisions the whole stack. The team also wrote load tests in k6 to check how the system behaves as the number of users grows.

## What I learned

Writing an ADR before building a screen made the frontend much easier to reason about. Questions like *"how does the swiping screen hear about a match?"* had already been answered at the architecture level, so the component only needed to listen for an event. It also showed me how much smoother collaboration becomes when decisions are written down where the whole team can review them.
