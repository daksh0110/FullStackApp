import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import ViewAllAdsButton from '../Buttons/allAdabutton/AllAdsButton'; 
import CreateAdButton from '../Buttons/Createbutton/CreateButton';
import i18n from "../../../i18n"

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const handleCreateAd = () => {
    console.log('Redirect to Create Ad page');
    navigate('/create-ad'); // Navigate to the Create Ad page
  };

  const handleViewAllAds = () => {
    console.log('Redirect to View All Ads');
    navigate('/ads'); // Navigate to the View All Ads page
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>{t('userAdmin.welcome')}</h1>
      {/* Create Ad Button */}
      <CreateAdButton onClick={handleCreateAd} />
      {/* View All Ads Button */}
      <ViewAllAdsButton onClick={handleViewAllAds} />
    </div>
  );
};

export default AdminHome;
