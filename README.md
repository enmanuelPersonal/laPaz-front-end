# La Paz Frontend

This project is built to maintain the inventory control of a funeral home, in which clients can make their payments through the platform and have a better follow-up of their payments and debts.

## Project Requirements

- [Node.js](https://nodejs.org/en/)

## Project Structure

    ├── .github
    ├── public
        ├── favicon.ico
        ├── index.html
        ├── logo192.png
        ├── logo512.png
        ├── manifest.json
        └── robots.txt
    ├── src
        ├── components          # React Custom Components
        ├── context             # React App Context
        ├── helpers             # Helper functions
        ├── hooks               # React Custom Hooks
        ├── pages               # Screens App
        ├── reducer             # Context reducers and actions
        ├── routers             # App routing systems
        ├── theme               # Material UI Theme configuration
        ├── App.js              # App Component
        ├── index.js
        ├── setupTest.js
    ├── .eslintcache
    ├── .gitignore
    ├── .nvmrc                  # Node Version file
    ├── packagelock.json
    ├── package.json
    └── README.md

## Execution

If you want to be able to execute the project you will first need to install the requirements listed in the [Project Requirements Section](#project-requirements).

- Clone this repo by running:

  ```bash
  git clone https://github.com/enmanuelPersonal/laPaz-front-end.git
  ```

- Install the project dependencies:

  ```bash
  npm install
  ```

- Start the project in development mode:

  ```bash
  npm run dev
  ```

#### Serve with Express

- Make sure you don't have an old build in the root of the project:

```bash
  rm -R build
```

- First, create the React build:

```bash
  npm run build
```

- Then just run `npm start` to start serving the app. You should get a log like the following:

```bash
  🚀 Client Running on: http://localhost:3000
```

> Keep in mind that every time you make a change in the `/src` folder, you will need to re-run the build command.
