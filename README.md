# Instagram clone with Appwrite and Cordova

![image](https://user-images.githubusercontent.com/52203828/196832827-25dc6a5f-7a25-4b8a-9dec-4751ba6cd5f5.png)

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

![image](https://user-images.githubusercontent.com/52203828/196832083-3264337d-cc51-4104-82cd-32c2127878ee.png)

Create a database with the name `Instantgram` and the id `instantgram`

![image](https://user-images.githubusercontent.com/52203828/196832122-adf78902-f60b-4f62-86b4-cfca2088e9b8.png)

Run the command to create collections and functions

```bash
appwrite deploy collection  # Select all collections (press a)
appwrite deploy function    # Select all fucntions (press a)
```

Create a new API key in your console and head to functions.

In all the functions over there, add these two variables:

```bash
# change if needed
APPWRITE_FUNCTION_ENDPOINT=http://localhost/v1
APPWRITE_FUNCTION_API_KEY=secret_key_you_just_created
```

![image](https://user-images.githubusercontent.com/52203828/196832171-073eade6-511d-473c-99f5-6135c1fda449.png)

Create a storage bucket with the name `Instantgram` and the id `instantgram`

![image](https://user-images.githubusercontent.com/52203828/196832185-b85d3013-f586-4cf5-8e1b-b69290d05ba3.png)

Set these permissions and allowed file extensions as shown in the image below

![image](https://user-images.githubusercontent.com/52203828/196832297-6225b7f3-d7ce-4e33-917d-55cd79510e9e.png)

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
