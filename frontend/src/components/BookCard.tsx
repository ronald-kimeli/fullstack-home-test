import React from 'react';
import { Card, CardContent, Typography, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import { Book } from '../types/book';
import theme from '../themes/themes';
import CustomButton from './custom/CustomButton';
import BookMedia from './custom/BookMedia';

// Define styled components
const BookCardContainer = styled(Card)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const BookCardContent = styled(CardContent)({
  flexGrow: 1,
});

type BookCardProps = {
  book: Book;
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
};

const BookCard: React.FC<BookCardProps> = ({ book, buttonText, onButtonClick, showButton = true }) => {
  return (
    <BookCardContainer sx={{
      maxWidth: 345,
      '@media (max-width:600px)': {
        maxWidth: '100%',
      },
    }}>
      <CardActionArea>
        <BookMedia
          src={book.coverPhotoURL}
          alt={book.title}
        />
        <BookCardContent>
          <Typography gutterBottom variant="h5" color={theme.palette.text.primary} component="div" style={{ fontFamily: theme.typography.fontFamily }}>
            {book.title}
          </Typography>
          <Typography variant="body2" color={theme.palette.warning.main} style={{ fontFamily: theme.typography.fontFamily }}>
            Author: {book.author}
          </Typography>
        </BookCardContent>
      </CardActionArea>
      {showButton && (
        <CardActions style={{ justifyContent: 'center' }}>
          <CustomButton
            onClick={onButtonClick}
            variant="outlined"
            color="secondary"
            hoverColor={theme.palette.text.primary}
            hoverBackgroundColor={theme.palette.secondary.dark}
            textColor={theme.palette.common.white}
            className="custom-stick"
          >
            {buttonText}
          </CustomButton>
        </CardActions>
      )}
    </BookCardContainer>
  );
};

export default BookCard;
