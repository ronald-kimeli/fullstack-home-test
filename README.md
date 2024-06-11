# Full-Stack React typescript frontend with Graphql node backend

## Access
Navigate to `/backend` and also `/frontend` folder on different terminals run below code to install dependencies

```bash
npm install
```

Then run the following command to start the server - Backend Graphql server on browser at the url `http://localhost:4000/`

```bash
npm start
```

Then run the following command to start the server - Frontend browser at the url `http://localhost:3000/`

```bash
npm run dev
```

This start a Graphql single query `books` that returns a list of books. 

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

## Features

- Categorized book view according to reading level
- Paginated data according to screen size for load More
- Book search with their titles
- Multiselect Filtered books after search
- Adding and removing selected books from filtered books to reading list
- Persist reading list after refresh
- Mobile responsiveness with book content
- Toast for any successful action
- Re-usable components
- Links to every reading level categorized data.


### Quick Overview
<img width="auto" alt="Screenshot from 2024-06-11 00-27-58" src="https://github.com/ronald-kimeli/fullstack-home-test/blob/main/frontend/public/images/Screenshot%20from%202024-06-11%2000-27-58.png">






