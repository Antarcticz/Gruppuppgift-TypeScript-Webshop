import { Route, Routes } from 'react-router-dom';
import AskForm from './Pages/AskForm/AskForm'
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import { AuthContextProvider } from './context/AuthContext';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';

export default function App() {
  
  return (
    <div className='app-container'>
      <AuthContextProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/ask" element={<AskForm />} />
            <Route path="/signIn" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        <Footer/>
      </AuthContextProvider>
    </div>
  );
}
