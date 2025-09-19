import React, { useState } from 'react';
import './login.css';
import { login } from '../../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await login(formData);
      // Simpan token dan redirect
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/dashboard';
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-left">Tabba</div>
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 400'%3E%3Cpath fill='%23ffffff' d='M416,280c0-33.1-21.2-62.7-53-73.6c5.2-13.8,8-28.8,8-44.4c0-61.9-50.1-112-112-112c-61.9,0-112,50.1-112,112 c0,15.6,2.8,30.6,8,44.4c-31.8,10.9-53,40.5-53,73.6c0,44.2,35.8,80,80,80h160C380.2,360,416,324.2,416,280z'/%3E%3Ccircle fill='%23ffffff' cx='260' cy='155' r='20'/%3E%3Ccircle fill='%23ffffff' cx='220' cy='100' r='15'/%3E%3Ccircle fill='%23ffffff' cx='300' cy='120' r='12'/%3E%3Cpath fill='%23ffffff' d='M150,360v20h220v-20H150z'/%3E%3C/svg%3E" 
             alt="Reading Illustration" 
             className="illustration" />
        
        <div className="left-content">
          <h2>Tambahkan Bacaan Kamu</h2>
          <p>Masuk untuk mengakses koleksi buku terbaik dan temukan bacaan baru yang sesuai dengan minat kamu.</p>
        </div>
      </div>
      
      <div className="right-section">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Masuk ke Tabba</h1>
            <p>Selamat datang kembali! Silakan masuk ke akun kamu.</p>
          </div>
          
          {errors.general && <div className="error-message">{errors.general}</div>}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="Alamat email kamu" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              {errors.email && <span className="field-error">{errors.email[0]}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  placeholder="Kata sandi kamu" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              {errors.password && <span className="field-error">{errors.password[0]}</span>}
            </div>
            
            <div className="remember-forgot">
              <div className="remember">
                <input 
                  type="checkbox" 
                  id="remember" 
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Ingat saya</label>
              </div>
              <a href="/forgot-password" className="forgot-password">Lupa kata sandi?</a>
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
          
          <div className="divider">
            <span>Atau lanjutkan dengan</span>
          </div>
          
          <div className="social-login">
            <div className="social-btn">
              <i className="fab fa-google"></i>
            </div>
            <div className="social-btn">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="social-btn">
              <i className="fab fa-twitter"></i>
            </div>
          </div>
          
          <div className="signup-link">
            Belum punya akun? <a href="/register">Daftar sekarang</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;