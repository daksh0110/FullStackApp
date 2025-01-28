import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.css';
import AnimatedWrapper from '../animation/AnimationWrapper'; // Import AnimatedWrapper
import { useRegisterMutation } from '../../services/authApi'; // Import the register mutation hook

// Define the schema for validation using Yup
const registerSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  username: yup.string().required('Name is required'),
});

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const [registerUser] = useRegisterMutation(); // Initialize the register mutation

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsSubmitting(true); // Start submitting

    try {
      const response = await registerUser(data).unwrap(); 

      // Call the register mutation and unwrap the result
      toast.success('Registration successful!');
      
      // Navigate to the login page after successful registration
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);

     
    } catch (error) {
      toast.error(error?.message || 'An error occurred during registration');
    } finally {
      setIsSubmitting(false); // Stop submitting
    }
  };

  return (
    <AnimatedWrapper> {/* Wrap the form with AnimatedWrapper */}
      <div className={styles.registerFormContainer}>
        <h2 className={styles.formTitle}>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              {...register('username')}
              placeholder="Enter your name"
              className={styles.input}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="Enter your email"
              className={styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              placeholder="Enter your password"
              className={styles.input}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className={styles.registerLink}>
          Already registered? <Link to="/auth/login" className={styles.link}>Login</Link>
        </p>
        <ToastContainer aria-label="Toast notifications" /> 
      </div>
    </AnimatedWrapper>
  );
};

export default RegisterForm;
