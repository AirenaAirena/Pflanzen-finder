1782974667243_image.png
Вижу — AirenaAirena это твой GitHub username. Значит репозиторий на github.com/AirenaAirena. Открой эту ссылку в браузере и скажи как называется репозиторий — там увидишь список твоих проектов.

Я открыла, и я не вижу. У меня есть список этих моих проектов, но там его нету.

Окей, в терминале VS Code напиши:

git remote -v
Скинь что написало — там будет полный адрес репозитория.

Длизная штука, я открыла свой новый этот, не свой новый, а зашла туда, значит, я вижу три работы закреплённые, и календарь, когда я, что закидывала. И под низом я вижу название Фланце Финда, но он у меня, как бы, не закреплён на общем экране или что, ничего не пойму.

Окей, нашли! Репозиторий называется Pflanzen-Finder (или похожее). Нажми на него — откроется страница репозитория, и вверху будет адрес типа github.com/AirenaAirena/pflanzen-finder. Скинь точное название.

[Pflanzen-finder](https://github.com/AirenaAirena/Pflanzen-finder)

Отлично, нашли! Теперь пишем README. Создаёшь файл README.md в корне проекта (рядом с package.json) и вставляешь:

markdown

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
