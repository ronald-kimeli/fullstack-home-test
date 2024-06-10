import React, { useState } from 'react';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { Book } from '../types/book';
import BookCard from './BookCard';
import { useScreenSize } from '../hooks/useScreenSize';

interface CategorizedBookDataProps {
    categoryKeys: string[];
    groupedBooks: Record<string, Book[]>;
    initialDisplayCount?: number; 
}

const CategorizedBookData: React.FC<CategorizedBookDataProps> = ({ categoryKeys, groupedBooks }) => {
    const [displayCounts, setDisplayCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const screenSize = useScreenSize();

    const loadMore = (category: string) => {
        setLoading(prevLoading => ({ ...prevLoading, [category]: true }));
        const nextDisplayCount = (displayCounts[category] || screenSize) + screenSize;
        setDisplayCounts(prevCounts => ({ ...prevCounts, [category]: nextDisplayCount }));
        setTimeout(() => setLoading(prevLoading => ({ ...prevLoading, [category]: false })), 1000); 
    };

    return (
        <>
            {categoryKeys.map((category: string) => {
                const remainingCount = groupedBooks[category].length - (displayCounts[category] || screenSize);
                return (
                    <Box key={category} mt={3}>
                        <Typography variant="h5" id={category} gutterBottom align="center">
                            {`Reading Level ${category}`}
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            {groupedBooks[category].slice(0, displayCounts[category] || screenSize).map((book: Book, index: number) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                                    <BookCard
                                        book={book}
                                        showButton={false}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        {remainingCount > 0 && (
                            <Box mt={2} textAlign="center">
                                <Button
                                    variant="outlined"
                                    onClick={() => loadMore(category)}
                                    disabled={loading[category]}
                                >
                                    {loading[category] ? <CircularProgress size={24} /> : "Load More"}
                                </Button>
                            </Box>
                        )}
                    </Box>
                );
            })}
        </>
    );
};

export default CategorizedBookData;








