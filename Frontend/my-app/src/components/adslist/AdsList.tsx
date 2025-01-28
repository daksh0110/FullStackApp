import React, { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { useGetAdsQuery, useIncrementViewMutation, useIncrementClickMutation } from "../../services/adsApi";
import { useGetWalletBalanceQuery, useUpdateWalletMutation } from "../../services/walletApi"; // Import walletApi mutation
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const AdsList: React.FC = () => {
  const { t } = useTranslation(); // Initialize translation
  const { data, isLoading } = useGetAdsQuery(); 
  const [incrementView] = useIncrementViewMutation(); 
  const [incrementClick] = useIncrementClickMutation(); 
  const [updateWallet] = useUpdateWalletMutation(); // Correctly use the mutation function
  const [viewedAds, setViewedAds] = useState<Set<string>>(new Set());

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('accessToken');
  const userId = user?.id;
  const role = user?.role;
  const { refetch: refetchWallet } = useGetWalletBalanceQuery(userId, {
    skip: !userId,
  }); 

  const isLoggedIn = !!token && role === 'user';

  const handleAdClick = async (adId: string, userId: string, pricePerClick: number) => {
    if (!isLoggedIn) {
      toast.error(t('ads_list.error_login')); // Use translation
      return;
    }

    if (!userId) {
      toast.error(t('ads_list.error_missing_user')); // Use translation
      return;
    }

    const toastId = toast.loading(t('ads_list.loading_toast')); // Use translation

    try {
      const response = await incrementClick({ adId, userId }).unwrap();

      if (response.success) {
        const walletResponse = await updateWallet({ userId, amount: pricePerClick }).unwrap();

        if (walletResponse.success) {
          toast.update(toastId, {
            render: t('ads_list.success_click', { price: pricePerClick }), // Use translation with dynamic price
            type: 'success',
            isLoading: false,
            autoClose: 3000, // Close after 3 seconds
          });

          refetchWallet(); // Update the ads and wallet balance
          const updatedUser = { ...user, walletBalance: walletResponse.newBalance };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          toast.update(toastId, {
            render: walletResponse.message || t('ads_list.error_wallet'), // Use translation
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        toast.update(toastId, {
          render: response.message || t('ads_list.error_click'), // Use translation
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding click:', error);
      toast.update(toastId, {
        render: t('ads_list.error_click'), // Use translation
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
    window.location.reload();
  };

  return (
    <div className={styles.adsListContainer}>
      <h1 className={styles.title}>{t('ads_list.title')}</h1> {/* Use translation */}
      {isLoading ? (
        <div className={styles.skeletonContainer}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} height={100} width="100%" className={styles.skeleton} />
            ))}
        </div>
      ) : (
        <div className={styles.adsGrid}>
          {data?.data?.map((ad) => (
            <div
              key={ad._id}
              className={styles.adCard}
              onClick={() => handleAdClick(ad._id, userId, ad.pricePerClick)} 
            >
              <h3 className={styles.adTitle}>{ad.title}</h3>
              <p className={styles.adDescription}>{ad.description}</p>
              <span className={styles.adPrice}>{t('userAdmin.price-per-click')}: ${ad.pricePerView}</span>
            </div>
          ))}
        </div>
      )}

      <ToastContainer 
        autoClose={5000} // Set auto-close duration to 5 seconds
        closeOnClick // Close toast on click
        pauseOnHover // Pause auto-close on hover
        draggable // Allow drag to dismiss
        aria-label='Toast notifications' // Accessible label
        closeButton={true}
      />
    </div>
  );
};

export default AdsList;
