import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import t function for translations
import ViewAllAdsButton from "../Buttons/allAdabutton/AllAdsButton";

const UserHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize t function for translations

  const handleViewAllAds = () => {
    console.log('Redirect to View All Ads');
    navigate('/ads');
    // Add navigation logic here, e.g., navigate('/ads');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>{t('userHome.welcomeMessage')}</h1> {/* Translated welcome message */}
      <ViewAllAdsButton onClick={handleViewAllAds} />
    </div>
  );
};

export default UserHome;
