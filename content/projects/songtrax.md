---
title: SongTrax
tagline: A location-based music experience, a little like Pokémon GO for songs, built as both a web app and a cross-platform mobile app.
kind: Web and mobile app
problem: Building one product across web and native mobile means sharing logic and structure between platforms, while still using device features such as location, maps and the camera roll.
contribution: Built the web and mobile apps, including the modular component structure, routing, state management, API integration, and the native map and image-picker features.
stack: [JavaScript, JSX, Node.js, REST APIs, Maps, Image picker]
evidence: summary
featured: true
order: 6
diagram:
  title: App structure
  caption: A simplified view of how the web and mobile apps share one approach.
  steps:
    - label: Screens and routing
      note: Separate views for each part of the experience
    - label: Shared state
      note: Holds the user's songs, locations and profile
      emphasis: true
    - label: API integration
      note: Loads and saves songs and locations
    - label: Device APIs
      note: Maps for location, an image picker for photos
---

## Overview

SongTrax ties music to places, in the spirit of Pokémon GO: songs live at locations, and the experience is about finding them as you move around. I built it twice, as a web app and as a native mobile app, using the same component-based approach in JSX for both.

## Problem

Sharing structure and logic between web and native apps is harder than it sounds. Navigation, state and device access all work differently on each platform. On a phone, the app also has to work with the device itself, using location and maps to place songs and the image picker for photos.

## My role and approach

- **Modular code organisation.** Small, reusable components and functions, written in a functional style.
- **Routing** between the app's screens on both the web and mobile versions.
- **State management** for the data the app depends on.
- **API integration** to load and save the app's data.
- **Device APIs** on mobile: maps to anchor the experience to real locations, and an image picker for photos.
