/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import NotificationPopup from "../../component/notification.jsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { auth } from "../../services/api.jsx";

const Register = (onSignin) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const db = getDatabase();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(child(ref(db), `users/${user.uid}`));

      if (!snapshot.exists()) {
        await set(userRef, {
          email: user.email,
          name: user.displayName,
          role: "user",
          token: user.uid,
          password: null,
        });
        console.log("User baru disimpan ke database");
        setNotificationMessage(
          "Registrasi berhasil! Silakan login dengan akun Anda."
        );
        setNotificationType("success");
        setShowNotification(true);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        console.log("User sudah ada di database:", snapshot.val());
      }

      return user;
    } catch (error) {
      console.error("Error sign in:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap harus diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setNotificationMessage(
          "Registrasi berhasil! Silakan login dengan akun Anda."
        );
        setNotificationType("success");
        setShowNotification(true);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setErrors({ general: data.message || "Terjadi kesalahan" });
      }
    } catch (error) {
      setNotificationMessage("Registrasi gagal. Silakan coba lagi.");
      setNotificationType("error");
      setShowNotification(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-left'>
        <div className='auth-logo'>Tabba</div>
        <div className='auth-circle-1'></div>
        <div className='auth-circle-2'></div>

        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 400'%3E%3Cpath fill='%23ffffff' d='M416,280c0-33.1-21.2-62.7-53-73.6c5.2-13.8,8-28.8,8-44.4c0-61.9-50.1-112-112-112c-61.9,0-112,50.1-112,112 c0,15.6,2.8,30.6,8,44.4c-31.8,10.9-53,40.5-53,73.6c0,44.2,35.8,80,80,80h160C380.2,360,416,324.2,416,280z'/%3E%3Ccircle fill='%23ffffff' cx='260' cy='155' r='20'/%3E%3Ccircle fill='%23ffffff' cx='220' cy='100' r='15'/%3E%3Ccircle fill='%23ffffff' cx='300' cy='120' r='12'/%3E%3Cpath fill='%23ffffff' d='M150,360v20h220v-20H150z'/%3E%3C/svg%3E"
          alt='Reading Illustration'
          className='auth-illustration'
        />

        <div className='auth-content'>
          <h2>Bergabung dengan Komunitas Pembaca</h2>
          <p>
            Daftar sekarang untuk mengakses koleksi buku terbaik dan temukan
            bacaan baru yang sesuai dengan minat kamu.
          </p>
        </div>
      </div>

      <div className='auth-right'>
        <div className='auth-form-container'>
          <div className='auth-header'>
            <h1>Daftar Akun Baru</h1>
            <p>Buat akun untuk mulai menjelajahi koleksi buku kami.</p>
          </div>

          {errors.general && (
            <div className='error-message'>{errors.general}</div>
          )}

          <form className='auth-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Nama Lengkap</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder='Masukkan nama lengkap kamu'
              />
              {errors.name && (
                <span className='field-error'>{errors.name}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder='Masukkan alamat email kamu'
              />
              {errors.email && (
                <span className='field-error'>{errors.email}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder='Buat password yang kuat'
              />
              {errors.password && (
                <span className='field-error'>{errors.password}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Konfirmasi Password</label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
                placeholder='Ulangi password kamu'
              />
              {errors.confirmPassword && (
                <span className='field-error'>{errors.confirmPassword}</span>
              )}
            </div>

            {/* <div className='form-group'>
              <label htmlFor='role'>Daftar Sebagai</label>
              <div className='role-selection'>
                <label className='role-option'>
                  <input
                    type='radio'
                    name='role'
                    value='user'
                    checked={formData.role === "user"}
                    onChange={handleChange}
                  />
                  <div className='role-card'>
                    <div className='role-icon'>👤</div>
                    <div className='role-info'>
                      <div className='role-title'>User</div>
                      <div className='role-desc'>
                        Akses untuk membaca dan membeli buku
                      </div>
                    </div>
                  </div>
                </label>

                <label className='role-option'>
                  <input
                    type='radio'
                    name='role'
                    value='admin'
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                  />
                  <div className='role-card'>
                    <div className='role-icon'>👑</div>
                    <div className='role-info'>
                      <div className='role-title'>Admin</div>
                      <div className='role-desc'>
                        Akses untuk mengelola konten dan user
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div> */}

            <div className='divider'>
              <span>Atau lanjutkan dengan</span>
            </div>

            <div className='social-login'>
              <div className='social-btn'>
                <img
                  className='google-btn login-icon'
                  src='https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png'
                  alt='google'
                  onClick={signInWithGoogle}></img>
              </div>
              <div className='social-btn'>
                <img className='tabba-btn login-icon' src='favicon.ico' alt="tabba"></img>
              </div>
              <div className='social-btn'>
                <img
                  alt="github"
                  className='gitub-btn login-icon'
                  src='https://pngimg.com/uploads/github/github_PNG40.png'></img>
              </div>
            </div>

            <div className='form-group'>
              <label className='checkbox-label'>
                <input
                  type='checkbox'
                  name='agreeToTerms'
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className={errors.agreeToTerms ? "error" : ""}
                />
                <span>
                  Saya menyetujui <a href='#'>Syarat & Ketentuan</a> dan{" "}
                  <a href='#'>Kebijakan Privasi</a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <span className='field-error'>{errors.agreeToTerms}</span>
              )}
            </div>

            <button
              type='submit'
              className='auth-button'
              disabled={isSubmitting}>
              {isSubmitting ? "Mendaftarkan..." : "Daftar Sekarang"}
            </button>
          </form>

          <div className='auth-divider'>
            <span>Sudah punya akun?</span>
          </div>

          <div className='auth-footer'>
            <Link to='/login' className='auth-link'>
              Masuk ke akun kamu
            </Link>
          </div>
        </div>
      </div>

      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
          duration={1500}
        />
      )}
    </div>
  );
};

export default Register;
