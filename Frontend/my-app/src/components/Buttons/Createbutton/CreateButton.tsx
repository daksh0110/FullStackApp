import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

interface CreateAdButtonProps {
  onClick: () => void;
}

const CreateAdButton: React.FC<CreateAdButtonProps> = ({ onClick }) => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {t('userAdmin.createAd')} {/* Use translation */}
    </motion.button>
  );
};

export default CreateAdButton;
