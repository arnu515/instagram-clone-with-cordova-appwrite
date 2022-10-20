# Instagram clone with Appwrite and Cordova

This is a simple Instagram clone that uses Appwrite as the backend and Cordova as the frontend.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed
- An [Appwrite](https://appwrite.io/) server running

### Installing

Clone the repository

```bash
git clone https://github.com/arnu515/instagram-clone-with-cordova-appwrite
```

Install the dependencies

```bash
npm install  # or yarn install
```

### Initializing Appwrite

Install the Appwrite CLI

```bash
npm i -g appwrite

appwrite login
```

In your Appwrite console, create a project with the name `Instantgram` and the id `instantgram`

Create a database with the name `Instantgram` and the id `instantgram`

Run the command to create collections and functions

```bash
appwrite deploy collection  # Select all collections (press a)
appwrite deploy function    # Select all fucntions (press a)
```

Create a storage bucket with the name `Instantgram` and the id `instantgram`

### Set up the project

Create a file called `.env` with the following contents

```bash
# replace with your appwrite server's endpoint
VITE_APPWRITE_ENDPOINT=http://localhost/v1
# don't change.
VITE_APPWRITE_PROJECT_ID=instantgram
```

### Run the project (electron)

```bash
# build frontend
yarn build

# run electron
npx cordova run electron --nobuild
```

Cheers :sparkle:
