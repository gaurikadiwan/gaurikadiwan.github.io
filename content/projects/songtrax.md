---
title: SongTrax
tagline: A location-based music app, a little like Pokémon GO for songs. Users compose short music samples and share them to real places, on the web and on mobile.
kind: Individual project · Web and mobile
period: Oct 2023
problem: Users need a simple way to compose a music sample, save it, and attach it to a real-world location, on both the web and a phone, with all data persisted through an API.
contribution: Designed and built both apps on my own, a React web app for creating, editing and previewing samples, and a React Native app built with Expo that uses the device's location, maps and image picker.
stack: [JavaScript, React, React Native, Expo, REST APIs, Maps, Image picker]
evidence: summary
featured: true
order: 6
diagram:
  title: How a song reaches a location
  caption: Both apps share the same flow, backed by one REST API.
  steps:
    - label: Compose
      note: Create and edit a music sample in the web app
    - label: Preview
      note: Play the sample back before saving
    - label: Save via API
      note: Samples persisted through a REST API
      emphasis: true
    - label: Share to a location
      note: Link the sample to a place
    - label: Discover on mobile
      note: Maps and location on the device
---

## Overview

SongTrax ties music to places, in the spirit of Pokémon GO: songs live at real-world locations, and the experience is about creating them and finding them as you move around. I built it as an individual project in two parts, a **React web app** and a **cross-platform mobile app in React Native with Expo**.

## The web app

The React web app is where music is made. Users can:

- **Create** short music samples.
- **Edit** existing samples.
- **Preview** a sample by playing it back before saving.
- **Share** a sample to a location, so it becomes discoverable at that place.

All samples and their locations are saved through a REST API, so the web and mobile apps work from the same data.

## The mobile app

The mobile app, built with React Native and Expo, brings SongTrax onto the phone, where location matters. It uses device APIs:

- **Maps and location** to show where samples live and tie the experience to the user's surroundings.
- **An image picker** so users can add photos from the device.

Expo made it possible to develop and test on a phone from one JavaScript codebase.

## Engineering approach

- **Modular components.** Small, reusable components and functions, written in a functional style with JSX, so each part of the interface stays easy to understand and change.
- **Routing** between the app's screens on both web and mobile.
- **State management** for samples, locations and the user's in-progress edits.
- **API integration** to create, read, update and share samples.

## What I learned

Building the same product on two platforms showed me which ideas carry over and which don't. Components, state and API logic transfer well between React and React Native. Navigation, layout and device features each need a platform-specific approach.
