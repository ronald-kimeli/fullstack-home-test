import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { ButtonProps } from '../../types/button.ts';

const CustomButton: React.FC<ButtonProps> = ({
  color = 'primary',
  variant = 'contained',
  hoverColor,
  hoverBackgroundColor,
  textColor = '#FFFFFF',
  children,
  onClick,
  className,
}) => {
  const theme = useTheme();
  let backgroundColor;

  if (color === 'primary') {
    backgroundColor = theme.palette.primary.main;
  } else if (color === 'secondary') {
    backgroundColor = variant === 'contained' ? theme.palette.secondary.main : theme.palette.secondary.dark;
  }

  const hoverStyles = hoverColor && hoverBackgroundColor ? {
    '&:hover': {
      color: hoverColor,
      backgroundColor: hoverBackgroundColor,
    },
  } : {};

  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      size="small"
      sx={{
        '@media (max-width: 600px)': {
          width: '100%',
        },
      }}
      style={{ backgroundColor, color: textColor, ...hoverStyles, marginTop: 'auto' }}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
