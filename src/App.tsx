import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AskForm from './Pages/AskForm/AskForm'
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';


export default function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/ask" element={<AskForm />} />
          <Route path="/login" element={<AskForm />} />
        </Routes>
      <Footer/>
    </div>
  );
}