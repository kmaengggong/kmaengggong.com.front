import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './public/pages/Home';
import MemberList from './member/pages/MemberList';
import SignUp from './member/pages/SignUp';
import { Box, Container } from '@mui/material';
import Footer from './public/components/Footer';
import Header from './public/components/Header';
import SignIn from './member/pages/SignIn';
import PublicRoute from './public/contexts/PublicRoute';
import NotFound from './public/pages/NotFound';
import LoginRoute from './public/contexts/LoginRoute';
import ArticleList from './board/pages/ArticleList';
import ArticleCreate from './board/pages/ArticleCreate';
import SignOut from './member/pages/SignOut';
import ArticleDetail from './board/pages/ArticleDetail';
import ArticleUpdate from './board/pages/ArticleUpdate';

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
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/board" element={<ArticleList />} />
              <Route path="/board/:articleId" element={<ArticleDetail />} />

              <Route path="/member" element={<MemberList />} />
            </Route>

            <Route element={<LoginRoute />}>
              {/* <Route path="/member/:memberId" element={<MyPage />} /> */}
              <Route path="/board/create" element={<ArticleCreate />} />
              <Route path="/board/update/:articleId" element={<ArticleUpdate />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
