import { CssBaseline, Container } from '@mui/material';
import BlogList from './components/BlogList';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <BlogList />
      </Container>
    </>
  );
}

export default App;
