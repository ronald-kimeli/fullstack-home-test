
# Access
To get access to data that you will use for this challenge you can switch into the `src/backend` and also `src/frontend` folder and run

```bash
npm install
```

Then run the following command to start the server - Backend

```bash
npm start
```

Then run the following command to start the server - Frontend browser at the url `http://localhost:3000/`

```bash
npm run dev
```

This start a Graphql server at the url `http://localhost:4000/`, the server has a single query `books` that returns a list of books. 

```graphql
query Books {
  books {
    author
    coverPhotoURL
    readingLevel
    title
  }
}
```

### Quick Overview
<img width="auto" alt="Screenshot from 2024-06-11 00-27-58" src="https://github.com/ronald-kimeli/fullstack-home-test/blob/main/frontend/public/images/Screenshot%20from%202024-06-11%2000-27-58.png">



