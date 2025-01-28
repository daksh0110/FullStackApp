import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SkeletonLoader from "../skelatonLoader/SkelatonLoader"; 
import styles from './index.module.css'; 
import { useCreateSingleAdMutation } from '../../services/adsApi';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

interface AdFormData {
  title: string;
  description: string;
  mediaUrl: string;
  pricePerView: number;
  pricePerClick: number;
  isActive: boolean;
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  mediaUrl: yup.string().url('Invalid URL format').required('Media URL is required'),
  pricePerView: yup.number().min(0, 'Price per view must be a positive number').required('Price per view is required'),
  pricePerClick: yup.number().min(0, 'Price per click must be a positive number').required('Price per click is required'),
  isActive: yup.boolean().required('Status is required'),
});

const CreateAdForm: React.FC = () => {
  const { t } = useTranslation(); // Initialize translation
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<AdFormData>({
    resolver: yupResolver(schema),
  });

  const [createAd, { isLoading }] = useCreateSingleAdMutation(); // Get the mutation hook

  // Handle form submission
  const onSubmit = async (data: AdFormData) => {
    try {
      await createAd(data).unwrap();
      toast.success(t('createAdPage.successMessage')); // Show success toast
      navigate('/ads'); // Redirect to /ads after successful creation
    } catch (err) {
      if (err && err.data && err.data.message) {
        // Show backend error message in toast
        toast.error(err.data.message); // Display the error message from backend
      } else {
        toast.error(t('createAdPage.errorMessage')); // Show generic error if no message from backend
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorage.getItem('accessToken') === null || user.role !== 'admin') {
      navigate('/auth/login');
    }
    // Simulate loading time
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      {loading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        <>
          <div>
            <label htmlFor="title" className={styles.formLabel}>{t('createAdPage.form.title')}</label>
            <input
              id="title"
              {...register('title')}
              className={styles.formInput}
              placeholder={t('createAdPage.form.title')}
            />
            {errors.title && <p className={styles.errorMessage}>{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className={styles.formLabel}>{t('createAdPage.form.description')}</label>
            <textarea
              id="description"
              {...register('description')}
              className={styles.formTextarea}
              placeholder={t('createAdPage.form.description')}
            />
            {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="mediaUrl" className={styles.formLabel}>{t('createAdPage.form.mediaUrl')}</label>
            <input
              id="mediaUrl"
              {...register('mediaUrl')}
              className={styles.formInput}
              placeholder={t('createAdPage.form.mediaUrl')}
            />
            {errors.mediaUrl && <p className={styles.errorMessage}>{errors.mediaUrl.message}</p>}
          </div>

          <div>
            <label htmlFor="pricePerView" className={styles.formLabel}>{t('createAdPage.form.pricePerView')}</label>
            <input
              type="number"
              id="pricePerView"
              {...register('pricePerView')}
              className={styles.formInput}
              placeholder={t('createAdPage.form.pricePerView')}
            />
            {errors.pricePerView && <p className={styles.errorMessage}>{errors.pricePerView.message}</p>}
          </div>

          <div>
            <label htmlFor="pricePerClick" className={styles.formLabel}>{t('createAdPage.form.pricePerClick')}</label>
            <input
              type="number"
              id="pricePerClick"
              {...register('pricePerClick')}
              className={styles.formInput}
              placeholder={t('userAdmin.price-per-click')}
            />
            {errors.pricePerClick && <p className={styles.errorMessage}>{errors.pricePerClick.message}</p>}
          </div>

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
            />
            <label htmlFor="isActive" className={styles.checkboxLabel}>{t('createAdPage.form.isActive')}</label>
            {errors.isActive && <p className={styles.errorMessage}>{errors.isActive.message}</p>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? t('createAdForm.creatingAdButton') : t('createAdPage.createAdButton')}
          </button>
        </>
      )}
    </form>
  );
};

export default CreateAdForm;
