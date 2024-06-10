import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import theme from '../themes/themes';

interface CategoryBooksProps {
    categoryKeys: string[];
    scrollToCategory: (category: string) => void;
    theme: typeof theme;
}

const CategoryBooks: React.FC<CategoryBooksProps> = ({ categoryKeys, scrollToCategory, theme }) => (
    <Box mt={4} style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
            Book Categories
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categoryKeys.map((category: string) => (
                <Button
                    key={category}
                    variant="text"
                    onClick={() => scrollToCategory(category)}
                    sx={{ color: theme.palette.primary.main, minWidth: 0, margin: '4px', fontSize: '0.8rem' }}
                >
                    {`Reading Level ${category}`}
                </Button>
            ))}
        </div>
    </Box>
);

export default CategoryBooks;
