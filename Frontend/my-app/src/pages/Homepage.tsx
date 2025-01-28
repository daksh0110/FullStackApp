import Header from '../components/Header/Header';
import UserHome from '../components/UserHome/UserHome'; // Import the UserHome component
import AdminHome from '../components/AdminHome/AdminHome'; // Import the AdminHome component
import { useTranslation } from 'react-i18next'; // Import t function for translations

const Homepage = () => {
  const { t } = useTranslation(); // Initialize t function for translations
  const user = localStorage.getItem('user'); // Retrieve user data from localStorage
  const isLoggedIn = localStorage.getItem('accessToken') ? true : false;

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div><h1>{t('homepage.loginPrompt')}</h1></div> {/* Translated login prompt */}
      </>
    );
  }

  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <>
      <Header />
      {parsedUser && parsedUser.role === 'admin' ? <AdminHome /> : <UserHome />}
    </>
  );
};

export default Homepage;
