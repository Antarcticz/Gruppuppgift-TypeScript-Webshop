import Header from './components/Header/Header'
import Home from './Pages/Home/Home'
import AskForm from './Pages/AskForm/AskForm'
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {

  return (
    <div className='app-container'>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<AskForm />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}
