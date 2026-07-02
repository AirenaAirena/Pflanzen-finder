

# 🌿 Pflanzen Finder

A mobile-first plant identifier app built with React. You can scan a plant with your camera and get information about it — name, family, genus and description.

## What the app can do

- Onboarding screens for new users
- Identify plants by photo using camera
- See plant name, genus, family and description
- Search plants by name
- Browse plant diseases list
- Help page with articles
- Settings page

## Tech stack

- React + Vite
- React Router DOM
- Plant.id API — to identify plants from photo
- Perenual API — to search plants and diseases
- CSS (no UI libraries)

## How to run locally

1. Clone the repo
   git clone https://github.com/AirenaAirena/Pflanzen-finder.git

2. Install dependencies
   npm install

3. Create `.env` file in root folder and add your API keys
   VITE_PLANTID_API_KEY=your_key_here
   VITE_PERENUAL_API_KEY=your_key_here

4. Start the app
   npm run dev

## Pages

| Page             | Description                   |
| ---------------- | ----------------------------- |
| Onboarding       | Introduction slides           |
| Home             | Main screen with navigation   |
| Plant Identifier | Choose category before scan   |
| Camera           | Take photo of a plant         |
| Result           | Plant identification result   |
| Search           | Search plants by name         |
| Plant Disease    | List of common plant diseases |
| Help             | Articles about plants         |
| Settings         | App settings                  |

## APIs used

- [Plant.id](https://plant.id) — plant identification from image
- [Perenual](https://perenual.com) — plant and disease database

## Status

Project is in progress. Some features like disease details and favorites are planned for future.
