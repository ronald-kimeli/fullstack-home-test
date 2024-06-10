
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Checkbox, Button } from '@mui/material';
import { Book } from '../types/book';
import BookMedia from './custom/BookMedia';
import theme from '../themes/themes';

interface FilteredBooksProps {
    filteredBooks: Book[];
    selectedBooks: string[];
    handleBookSelect: (bookId: string) => void;
    addSelectedToReadingList: () => void;
    theme: typeof theme;
}

const FilteredBooks: React.FC<FilteredBooksProps> = ({ filteredBooks, selectedBooks, handleBookSelect, addSelectedToReadingList, theme }) => (
    <Box mt={4} style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
            Filtered Books
        </Typography>
        {filteredBooks.length > 0 ? (
            <>
                <Grid container spacing={2} justifyContent="center">
                    {filteredBooks.map((book: Book, index: number) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent style={{ flexGrow: 1 }}>
                                    <BookMedia src={book.coverPhotoURL} alt={book.title} />
                                    <Typography variant="h5">{book.title}</Typography>
                                    <Typography variant="subtitle1">{book.author}</Typography>
                                </CardContent>
                                <Box p={2}>
                                    <Checkbox
                                        checked={selectedBooks.includes(book.author)}
                                        onChange={() => handleBookSelect(book.author)}
                                    />
                                    <Typography variant="body2" color={"textPrimary"}>
                                        {selectedBooks.includes(book.author) ? 'Selected' : 'Check to select book'}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" style={{ marginTop: '6px' }} onClick={addSelectedToReadingList}>
                    Add Selected to Reading List
                </Button>
            </>
        ) : (
            <Typography variant="body1" color={theme.palette.error.main} style={{ marginTop: '16px' }}>
                No matching book titles found!. Please try again with another search term.
            </Typography>
        )}
    </Box>
);

export default FilteredBooks;



