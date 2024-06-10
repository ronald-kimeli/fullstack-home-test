export type ButtonProps = {
    color?: 'primary' | 'secondary';
    variant?: 'contained' | 'outlined' | 'text';
    hoverColor?: string;
    hoverBackgroundColor?: string;
    textColor?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  };