import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { i18n } = useTranslation();
const navigate=useNavigate()
  // Function to change language
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); // Change the language to the selected one
    localStorage.setItem('language', lang); // Save the selected language to localStorage
  };

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    
    // If a language is saved in localStorage, change the language
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // If no language is saved, set a default language (e.g., 'en')
      i18n.changeLanguage('en');
        navigate("/")
    }
  }, [i18n]);

  return (
    <div>
        <Header />
      <h1>{i18n.t('profile.title')}</h1> {/* Example translation key */}
      
      {/* Buttons to change language */}
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('hindi')}>हिन्दी</button>
      </div>
    </div>
  );
};

export default ProfilePage;
