import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './public/pages/Home';
import MemberList from './member/pages/MemberList';
import SignUp from './member/pages/SignUp';
import { Box, Container } from '@mui/material';
import Footer from './public/components/Footer';
import Header from './public/components/Header';
import SignIn from './member/pages/SignIn';

function App() {
  return (
    <div className="App">
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        minHeight: '100vh',
        mx: { xs: 1, sm: 2, md: 4 }
      }}>
        <Header />
        <Container sx={{mt: 4, mb: 8}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/member" element={<MemberList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
