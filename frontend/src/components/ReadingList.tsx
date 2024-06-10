import React, { useState } from 'react';
import { Typography, Grid, Button, CircularProgress } from '@mui/material';
import BookCard from './BookCard';
import { Book } from '../types/book';
import theme from '../themes/themes';
import { useScreenSize } from '../hooks/useScreenSize';

const ReadingList: React.FC<{ readingList: Book[], removeFromReadingList: (index: number) => void }> = ({ readingList, removeFromReadingList }) => {
    const [displayCount, setDisplayCount] = useState<number>(3);
    const [loading, setLoading] = useState<boolean>(false);
    const screenSize = useScreenSize();

    const loadMore = () => {
        setLoading(true);
        setDisplayCount(prevCount => prevCount + screenSize); 
        setTimeout(() => setLoading(false), 1000); 
    };

    return (
        <>
            <Typography variant="h4" gutterBottom mt={4} align="center">
                Reading List
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {readingList.slice(0, displayCount).map((book: Book, index: number) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                        <BookCard
                            book={book}
                            buttonText="Remove from Reading List"
                            onButtonClick={() => removeFromReadingList(index)}
                        />
                    </Grid>
                ))}
            </Grid>
            {readingList.length > displayCount && (
                <Grid container justifyContent="center" mt={2}>
                    <Button
                        variant="outlined"
                        onClick={loadMore}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Load More"}
                    </Button>
                </Grid>
            )}
            {readingList.length === 0 && (
                <Typography variant="body1" color={theme.palette.error.main} style={{ marginTop: '16px' }}>No book in the reading list at the moment!</Typography>
            )}
        </>
    );
};

export default ReadingList;

