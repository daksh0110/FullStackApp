import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store'; // Import your custom dispatch hook
import { loginSuccess, loginFailure } from '../../store/reducers/authReducer'; // Import login actions
import { useLoginMutation } from '../../services/authApi'; // Import your login mutation
import AnimatedWrapper from "../animation/AnimationWrapper"; // Import AnimatedWrapper
import styles from './index.module.css';
import { useTranslation } from 'react-i18next'; // Import the t function from react-i18next

// Define the validation schema for login form
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation(); // Initialize the t function for translations
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useAppDispatch(); // Use the custom dispatch hook
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation(); // Use login mutation

  // State to track the selected role (admin or user)
  const [role, setRole] = useState<'admin' | 'user'>('user'); // Default to 'user'

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Perform login mutation with the role included
      const response = await login({ ...data, role }).unwrap();
      console.log('Logged in:', response);
  
      // Dispatch loginSuccess action with the response data
      dispatch(loginSuccess({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: {       
          name: response.data.user.name,
          email: response.data.user.email,
          id: response.data.user.id,
          role: response.data.user.role,
        },
      }));
  
      // Save tokens and user data to localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      // Show success toast
      toast.success(t('login.success'));
  
      // Redirect to the home page after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('Login failed:', err);
      dispatch(loginFailure(err?.data?.message || t('login.failureMessage')));
      toast.error(t('login.failureMessage'));
    }
  };

  return (
    <AnimatedWrapper key="login">
      <div className={styles.loginContainer}>
        <h1>{t('login.title')}</h1>
        
        {/* Role Selection */}
        <div className={styles.roleSelection}>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            {t('login.userLogin')}
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            {t('login.adminLogin')}
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder={t('login.emailPlaceholder')}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              placeholder={t('login.passwordPlaceholder')}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? t('login.loggingIn') : t('login.login')}
          </button>
        </form>

        {error && <p className={styles.errorMessage}>{t('login.errorMessage', { message: error.message })}</p>}

        <div className={styles.registerLink}>
          <p>{t('login.dontHaveAccount')}</p>
          <button onClick={() => navigate('/auth/register')}>{t('login.registerHere')}</button>
        </div>
        <ToastContainer aria-label="Toast notifications" />
      </div>
    </AnimatedWrapper>
  );
};

export default LoginPage;
