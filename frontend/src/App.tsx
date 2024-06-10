import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookAssignmentView from './components/BookAssignmentView';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <BookAssignmentView />
        <ToastContainer />
      </Container>
    </>
  );
};

export default App;

