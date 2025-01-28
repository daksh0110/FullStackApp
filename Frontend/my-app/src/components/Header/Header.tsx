import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css'; // Import CSS module
import { useAppSelector, useAppDispatch } from '../../store/store';
import { useGetWalletBalanceQuery, useUpdateWalletMutation } from "../../services/walletApi"; // Import walletApi hooks
import { updateWalletBalance } from '../../store/reducers/walletReducer'; // Import action to update wallet balance in Redux
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next'; // Import the t function from react-i18next

interface User {
  id: string;
  name: string;
  role: string;
}

const Header: React.FC = () => {
  const { t } = useTranslation(); // Initialize the t function for translations
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch user info from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch wallet balance using RTK Query
  const { data: walletData, error, refetch, isLoading } = useGetWalletBalanceQuery(user?.id || '', {
    skip: !user?.id, // Skip query if user ID is not available
  });

  // Handle wallet balance updates in Redux and localStorage
  useEffect(() => {
    if (walletData?.data?.balance !== undefined) {
      dispatch(updateWalletBalance(walletData.data.balance)); // Update Redux store
    }
  }, [walletData, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleUpdateWallet = async (amount: number) => {
    if (!user?.id) return;

    try {
      const response = await updateWalletMutation({ userId: user.id, amount }).unwrap();

      if (response.success) {
        // Update Redux store and localStorage
        dispatch(updateWalletBalance(response.data.walletBalance));
        const updatedUser = { ...user, walletBalance: response.data.walletBalance };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Show success message
        toast.success(t('wallet.updated', { balance: response.data.walletBalance }));
        refetch(); // Refetch wallet balance
      } else {
        toast.error(response.message || t('wallet.updateError'));
      }
    } catch (error) {
      console.error('Error updating wallet:', error);
      toast.error(t('wallet.genericError'));
    }
  };

  // Handle wallet balance fetch error
  

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>
          <a href="/" className={styles.tit}>{t('header.adsSystem')}</a>
        </h1>
      </div>

      <div className={styles.headerRight}>
        {user ? (
          <div className={styles.userInfo}>
            {user.role === "user" && (
              <span className={styles.username}>
                {isLoading ? t('wallet.loading') : `${t('wallet.balance')}: $${walletData?.data?.balance ?? 0}`}
              </span>
            )}

            <span onClick={toggleDropdown} className={styles.username}>
              {user.role === 'admin' ? `${t('header.admin')} (${user.name})` : `${t('header.user')} (${user.name})`}
            </span>

            {dropdownVisible && (
              <div className={styles.dropdownMenu}>
                <button 
                  onClick={() => navigate('/profile')} 
                  className={styles.dropdownItem}
                >
                  {t('header.profile')}
                </button>
                <button 
                  onClick={handleLogout} 
                  className={styles.dropdownItem}
                >
                  {t('header.logout')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/auth/login" className={styles.loginButton}>{t('header.login')}</a>
        )}
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
