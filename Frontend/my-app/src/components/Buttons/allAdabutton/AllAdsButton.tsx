import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

interface ViewAllAdsButtonProps {
  onClick: () => void;
}

const ViewAllAdsButton: React.FC<ViewAllAdsButtonProps> = ({ onClick }) => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {t('userHome.viewAllAds')} {/* Use translation */}
    </motion.button>
  );
};

export default ViewAllAdsButton;
