 ![svgviewer-output](https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93)

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

### Styling Guidelines
<img width="961" alt="Screenshot from 2024-06-11 00-27-58" src="https://github.com/ronald-kimeli/fullstack-home-test/blob/main/frontend/public/images">



