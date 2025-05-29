// public/js/login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Firebase Configuration - Replace with your own config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Input Validation Functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password must be at least 6 characters (Firebase minimum)
  return password.length >= 6;
};

const validateName = (name) => {
  // Name should be at least 2 characters and contain only letters and spaces
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name.trim());
};

// Enhanced form message display with better styling
const showFormMessage = (form, message, type = 'info') => {
  // Remove existing message
  const existingMsg = form.querySelector('.form-message');
  if (existingMsg) {
    existingMsg.remove();
  }

  // Create new message element
  const msg = document.createElement('div');
  msg.className = 'form-message';
  
  // Style based on message type
  const styles = {
    success: { color: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4CAF50' },
    error: { color: '#f44336', backgroundColor: 'rgba(244, 67, 54, 0.1)', border: '1px solid #f44336' },
    warning: { color: '#ff9800', backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid #ff9800' },
    info: { color: '#2196F3', backgroundColor: 'rgba(33, 150, 243, 0.1)', border: '1px solid #2196F3' }
  };

  Object.assign(msg.style, {
    margin: '15px 0',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    display: 'block',
    animation: 'slideIn 0.3s ease-out',
    ...styles[type]
  });

  msg.textContent = message;
  form.insertBefore(msg, form.firstChild);

  // Auto-hide after 4 seconds
  setTimeout(() => {
    if (msg.parentNode) {
      msg.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => msg.remove(), 300);
    }
  }, 4000);
};

// Add CSS animations for messages
const addMessageStyles = () => {
  if (!document.getElementById('message-styles')) {
    const style = document.createElement('style');
    style.id = 'message-styles';
    style.textContent = `
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
  }
};

// Enhanced input validation with real-time feedback
const setupInputValidation = (input, validationFn, errorMessage) => {
  const showInputError = (message) => {
    input.style.borderColor = '#f44336';
    input.style.backgroundColor = 'rgba(244, 67, 54, 0.05)';
    
    // Remove existing error
    const existingError = input.parentNode.querySelector('.input-error');
    if (existingError) existingError.remove();
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.style.cssText = `
      color: #f44336;
      font-size: 12px;
      margin-top: 5px;
      text-align: left;
    `;
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  };

  const clearInputError = () => {
    input.style.borderColor = '';
    input.style.backgroundColor = '';
    const error = input.parentNode.querySelector('.input-error');
    if (error) error.remove();
  };

  // Real-time validation on blur
  input.addEventListener('blur', () => {
    if (input.value.trim() && !validationFn(input.value)) {
      showInputError(errorMessage);
    } else {
      clearInputError();
    }
  });

  // Clear error on focus
  input.addEventListener('focus', clearInputError);
};

// Main application logic
document.addEventListener('DOMContentLoaded', () => {
  addMessageStyles();

  // DOM elements
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
  const logoutMsg = document.getElementById('logout-message');

  // Panel switching logic
  if (signUpButton && container) {
    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
      if (logoutMsg) logoutMsg.style.display = 'none';
    });
  }

  if (signInButton && container) {
    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  // Show logout message if redirected from logout
  if (window.location.search.includes('logout=1') && logoutMsg) {
    logoutMsg.style.display = 'block';
    setTimeout(() => logoutMsg.style.display = 'none', 3500);
  }

  // Setup input validation for login form
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  
  if (loginEmail) {
    setupInputValidation(loginEmail, validateEmail, 'Please enter a valid email address');
  }
  
  if (loginPassword) {
    setupInputValidation(loginPassword, validatePassword, 'Password must be at least 6 characters');
  }

  // Setup input validation for registration form
  const registerName = document.getElementById('register-name');
  const registerEmail = document.getElementById('register-email');
  const registerPassword = document.getElementById('register-password');
  
  if (registerName) {
    setupInputValidation(registerName, validateName, 'Name must be 2-50 characters, letters only');
  }
  
  if (registerEmail) {
    setupInputValidation(registerEmail, validateEmail, 'Please enter a valid email address');
  }
  
  if (registerPassword) {
    setupInputValidation(registerPassword, (pass) => pass.length >= 8, 'Password must be at least 8 characters');
  }

  // Enhanced Login Form Handler
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = loginEmail.value.trim();
      const password = loginPassword.value;

      // Client-side validation
      if (!validateEmail(email)) {
        showFormMessage(loginForm, 'Please enter a valid email address', 'error');
        return;
      }

      if (!validatePassword(password)) {
        showFormMessage(loginForm, 'Password must be at least 6 characters', 'error');
        return;
      }

      // Show loading state
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Signing In...';
      submitBtn.disabled = true;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        showFormMessage(loginForm, 'Login successful! Redirecting...', 'success');
        
        // Store user info for personalization
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.displayName || 'User');
        
        setTimeout(() => {
          window.location.href = 'html/home.html';
        }, 1500);
        
      } catch (error) {
        let errorMessage = 'Login failed. Please try again.';
        
        // Handle specific Firebase errors
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later';
            break;
          default:
            errorMessage = error.message;
        }
        
        showFormMessage(loginForm, errorMessage, 'error');
      } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Enhanced Registration Form Handler
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = registerName ? registerName.value.trim() : '';
      const email = registerEmail.value.trim();
      const password = registerPassword.value;

      // Client-side validation
      if (name && !validateName(name)) {
        showFormMessage(registerForm, 'Please enter a valid name (2-50 characters, letters only)', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showFormMessage(registerForm, 'Please enter a valid email address', 'error');
        return;
      }

      if (password.length < 8) {
        showFormMessage(registerForm, 'Password must be at least 8 characters long', 'error');
        return;
      }

      // Password strength check
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      
      if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        showFormMessage(registerForm, 'Password should contain uppercase, lowercase, and numbers', 'warning');
      }

      // Show loading state
      const submitBtn = registerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Creating Account...';
      submitBtn.disabled = true;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile with name if provided
        if (name) {
          await updateProfile(user, { displayName: name });
        }
        
        // Send email verification
        await sendEmailVerification(user);
        
        showFormMessage(registerForm, 'Account created successfully! Please check your email for verification.', 'success');
        
        setTimeout(() => {
          container.classList.remove('right-panel-active');
          registerForm.reset();
        }, 2000);
        
      } catch (error) {
        let errorMessage = 'Registration failed. Please try again.';
        
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'An account with this email already exists';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please choose a stronger password';
            break;
          default:
            errorMessage = error.message;
        }
        
        showFormMessage(registerForm, errorMessage, 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Enhanced Google Authentication
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('profile');
  googleProvider.addScope('email');

  document.querySelectorAll('.social[aria-label*="Google"], .google-signin').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Show loading state
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        // Store user info
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.displayName || 'User');
        localStorage.setItem('userPhoto', user.photoURL || '');
        
        // Show success message
        const form = document.querySelector('.sign-in-container form') || document.querySelector('.sign-up-container form');
        if (form) {
          showFormMessage(form, 'Google login successful! Redirecting...', 'success');
        }
        
        setTimeout(() => {
          window.location.href = 'nextpage.html'; // Change to your home page
        }, 1500);
        
      } catch (error) {
        let errorMessage = 'Google login failed. Please try again.';
        
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Login cancelled by user';
            break;
          case 'auth/popup-blocked':
            errorMessage = 'Popup blocked. Please allow popups and try again';
            break;
          default:
            errorMessage = error.message;
        }
        
        const form = document.querySelector('.sign-in-container form') || document.querySelector('.sign-up-container form');
        if (form) {
          showFormMessage(form, errorMessage, 'error');
        } else {
          alert(errorMessage);
        }
      } finally {
        // Reset button state
        btn.style.opacity = '';
        btn.style.pointerEvents = '';
      }
    });
  });

  // Monitor authentication state
  onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes('login')) {
      // User is already logged in, redirect to home
      window.location.href = 'nextpage.html'; // Change to your home page
    }
  });

  // Add form enhancement styles
  const enhanceFormStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .form-message {
        animation: slideIn 0.3s ease-out;
      }
      
      input:focus {
        outline: none;
        border-color: #007AFF !important;
        box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1) !important;
      }
      
      .input-error {
        animation: fadeIn 0.2s ease-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
  };

  enhanceFormStyles();
});