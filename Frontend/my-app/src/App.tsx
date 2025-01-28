
import './App.css'
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import AdsListPage from './pages/AdsListPage';
import CreateAdPage from './pages/CreateAdPage';
import ProfilePage from './pages/ProfilePage';

const FallbackComponent = ({ error, resetErrorBoundary }) => (
  <div>
    <h2>Something went wrong: {error.message}</h2>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

function App() {


  return (
    <Router>
   
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/ads" element={<AdsListPage />} />
      <Route path='/create-ad' element={<CreateAdPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </Router>
  )
}

export default App
