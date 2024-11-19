# Project Title: SparkWell

## Overview

**What is your app? Give a brief description in a couple of sentences.**

SparkWell - An app that sparks productivity and wellness, and provides music recommendations based on a user's mood.

### Problem Space

**Why is your app needed? Give any background information around any pain points or other reasons.**

Many wellness apps are overly complicated, making them difficult for most users to engage with. Furthermore, there are very few apps designed to be inclusive and accessible to everyone, including neurodivergent individuals.

### User Profile

**Who will use your app? How will they use it? Add any special considerations that your app must take into account.**

Anyone can use the app, but I want it to be functional for neurodivergent individuals as well, as there aren't many self-care apps tailored for everyone. The app can be utilized by users over the age of 16 years old that want to boost their productivity and general wellness.

### Features

**List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.**

The app will use the Spotify API to provide mood-based song recommendations. A user will input their mood and a recommended song based on their mood will be populated. Additionally, the user can enter journal entries in an attempt to enhance their mood. If time permits, I will also create an additional page that provides access to previous journal entries.

## Implementation

### Tech Stack

**List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.**

Client libraries: react, axios
Server libraries: express

I plan to deploy the app on Netlify or Heroku.

### APIs

**List any external sources of data that will be used in your app.**

Spotify API

### Sitemap

**List the pages of your app with brief descriptions. You can show this visually, or write it out.**

There will be 2 pages to start. The home page will allow a user to input their mood and output a song recommendation based on their mood. The home page will also have a section for journalling. There will be an About page that provides an overview of the intent of the app.

### Mockups

**Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.**

![Screenshot of the Home Page Mockup](/Mockups/HomePage.png)

![Screenshot of the About Page Mockup](/Mockups/About.png)

### Data

**Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.**

Features:
o Notes section for journaling (see mock-up for an outline) - The user will have the opportunity to reflect on their current mood with the hopes that they will feel better afterwards. There will be a textbox for them to add in sentences for reflection.
o Mood input and music output for the mood (see mock-up for an outline) - The user will enter their current mood in a textbox, and Spotify will offer a song based on their mood from the Spotify API. Reflecting on how the user feels helps with recognizing emotional patterns and triggers to assist with managing emotions, helping with promoting emotional regulation, improving mental health through mood reflection to address them, enhance communication to express emotions more clearly to improve relationships, supports personal growth, boosts productivity, and encourages mindfulness.
o An about page (see mock-up for an outline) - I will describle some of the benefits above, as well as the intent of the app.

### Endpoints

**List endpoints that your server will implement, including HTTP methods, parameters, and example responses.**

The front-end endpoints can be found below.
/ --> homepage. On the back-end, I will likely need "get" for the Spotify API.
/about --> about page
/journal --> journal entries (previous). On the back-end, for the journal entries, I will need get and post.

## Roadmap

**Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date.**

Front-end layout via mock-ups and capstone proposal: November 18, 2024

Begin working on the front-end page structure (2 front-end end-points): November 19, 2024

Start to add styling and contents for the front-end: November 19, 2024

Begin working on the back-end (Express): November 23, 2024

Start integrating the front-end and back-end to ensure functionality: November 24, 2024

Add any extra functionality beyond the scope of the proposal, bug fixes: November 30, 2024

---

## Future Implementations

**Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.**

If time permits, I will also add a water intake section and an additional page that provides access to previous stored journal entries. In the future, I also plan to add user authentication.
