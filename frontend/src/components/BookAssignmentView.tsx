import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Book } from '../types/book';
import { client } from '../graphql/apollo-client';
import { GET_BOOKS } from '../graphql/queries';
import theme from '../themes/themes';
import { toast } from 'react-toastify';
import FilteredBooks from './FilteredBooks';
import CategoryBooks from './CategoryBooks';
import CategorizedBookData from './CategorizedBookData';
import ReadingList from './ReadingList';

const BOOKS_LOCAL_STORAGE_KEY = 'readingList';

const BookAssignmentView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [readingList, setReadingList] = useState<Book[]>(() => {
    const storedReadingList = localStorage.getItem(BOOKS_LOCAL_STORAGE_KEY);
    return storedReadingList ? JSON.parse(storedReadingList) : [];
  });

  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS, { client });
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const filteredBooks = data?.books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const groupedBooks = groupBooksByReadingLevel(data?.books);

  const categoryKeys = Object.keys(groupedBooks).sort();

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const addSelectedToReadingList = () => {
    const booksToAdd = getSelectedBooksToAdd(filteredBooks, selectedBooks, readingList);
    const updatedReadingList = [...readingList, ...booksToAdd];
    setReadingList(updatedReadingList);
    setSelectedBooks([]);
    setSearchTerm('');
    if (booksToAdd.length > 0) {
      toast.success(`${booksToAdd.length} Selected books added to the reading list successfully!`);
    }
    localStorage.setItem(BOOKS_LOCAL_STORAGE_KEY, JSON.stringify(updatedReadingList));
    scrollToTop();
  };


  const removeFromReadingList = (index: number) => {
    const bookToRemove = readingList[index];
    const updatedReadingList = [...readingList];
    updatedReadingList.splice(index, 1);
    setReadingList(updatedReadingList);
    toast.success(`${bookToRemove.title} removed successfully!`);
    localStorage.setItem(BOOKS_LOCAL_STORAGE_KEY, JSON.stringify(updatedReadingList));
  };


  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToCategory = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    categoryKeys.forEach(key => {
      categoryRefs.current[key] = document.getElementById(key) as HTMLDivElement | null;
    });
  }, [categoryKeys]);

  if (loading) return <p>Loading....</p>;

  if (error) {
    console.error('Error fetching books:', error);
    return <p>Error :(</p>;
  }

  const handleBookSelect = (bookId: string) => {
    setSelectedBooks(prevSelected => {
      if (prevSelected.includes(bookId)) {
        return prevSelected.filter(id => id !== bookId);
      } else {
        return [...prevSelected, bookId];
      }
    });
  };

  return (
    <Box marginBottom={4}>
     
      <ReadingList readingList={readingList} removeFromReadingList={removeFromReadingList} />

      <Box mt={4} style={{ textAlign: 'center' }}>
        <TextField
          label="Search Books"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </Box>

      {searchTerm !== '' ? (
        <FilteredBooks
          filteredBooks={filteredBooks}
          selectedBooks={selectedBooks}
          handleBookSelect={handleBookSelect}
          addSelectedToReadingList={addSelectedToReadingList}
          theme={theme}
        />
      ) : (
        <CategoryBooks
          categoryKeys={categoryKeys}
          scrollToCategory={scrollToCategory}
          theme={theme}
        />
      )}

      {searchTerm === '' && (
        <CategorizedBookData categoryKeys={categoryKeys} groupedBooks={groupedBooks} />
      )}

      {/* Scroll to Top Button */}
      <Button
        variant="contained"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer'
        }}
      >
        Scroll to Top
      </Button>
    </Box>
  );
};

export default BookAssignmentView;

const groupBooksByReadingLevel = (books: Book[] | undefined): Record<string, Book[]> => {
  return (
    books?.reduce((acc: Record<string, Book[]>, book: Book) => {
      if (!acc[book.readingLevel]) {
        acc[book.readingLevel] = [];
      }
      acc[book.readingLevel].push(book);
      return acc;
    }, {}) || {}
  );
};

const getSelectedBooksToAdd = (filteredBooks: Book[], selectedBooks: string[], readingList: Book[]): Book[] => {
  return filteredBooks.filter(book => selectedBooks.includes(book.author) && !readingList.some((b: Book) => selectedBooks.includes(b.author)));
};
