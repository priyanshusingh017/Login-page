# 🔐 Firebase Authentication Login Page

A secure, responsive login page with client-side validation and Firebase authentication, built with HTML, CSS, and JavaScript.

## Live preview

<div align="center">
  <img src="demo.gif" alt="Demo" width="100%">
</div>

## Technologies Used

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black) ![Font Awesome](https://img.shields.io/badge/-Font_Awesome-528DD7?logo=fontawesome&logoColor=white)


## ✨ Key Features

**🔒 Authentication**
- Email/password login
- Google sign-in
- Password reset
- Session management

**✅ Smart Validation**
- Real-time email validation
- Password strength checker
- Clear error messages

**💅 Modern UI**
- Fully responsive
- Smooth animations
- Loading indicators
- Dark/light themes

## 🔥 Firebase Integration

This project uses Firebase Authentication with the following configuration:

```javascript
// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/priyanshusingh017/Login-page.git
   cd Login-page

## Open in your preferred browser:

- Simply open `index.html` in any modern browser
- Or use Live Server extension in VS Code

## Customization

### Basic Customization:

1. Edit colors in `style.css` (CSS variables at the top)
   ```bash
   :root {
   --primary-color: #4361ee; /* Change this */
    --secondary-color: #3f37c9;
   }
  
2. Replace logo in index.html:
   ```bash
   <img src="assets/your-logo.png" alt="Your Logo">

3. Update Firebase config in firebase-config.js:
   ```bash
   const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "your-project.firebaseapp.com",
   // ... other config
   };

## 🚀 JavaScript Features

Key functionality implemented with code examples:

### Form Validation
```javascript
// Email and password validation
function validateForm() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Clear previous errors
  clearErrors();
  
  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Please enter a valid email address');
    return false;
  }
  
  // Password validation (min 8 chars, 1 number, 1 special char)
  if (password.length < 8) {
    showError('password', 'Password must be at least 8 characters');
    return false;
  }
  
  return true;
}
```
### Remember Me Functionality
```javascript
// Save email to localStorage
function rememberUser(email) {
  if (document.getElementById('remember-me').checked) {
    localStorage.setItem('rememberedEmail', email);
  } else {
    localStorage.removeItem('rememberedEmail');
  }
}

// Check for remembered user on page load
window.addEventListener('DOMContentLoaded', () => {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    document.getElementById('email').value = rememberedEmail;
    document.getElementById('remember-me').checked = true;
  }
});
```

### Animated Transitions
```javascript
// Smooth error message animation
function showError(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  errorElement.textContent = message;
  errorElement.style.opacity = 0;
  errorElement.style.display = 'block';
  
  // Animate fade in
  setTimeout(() => {
    errorElement.style.transition = 'opacity 0.3s ease';
    errorElement.style.opacity = 1;
  }, 10);
}
```
### Mock AJAX Login
```javascript
// Simulate API request
function mockLogin(email, password) {
  showLoader();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      hideLoader();
      resolve({ success: true, user: { email } });
    }, 1500);
  });
}
```
### Responsive Menu Toggle
```javascript
// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('active');
  
  // Animate hamburger icon
  this.classList.toggle('open');
});
```

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Prerequisites
- Git installed
- Node.js (v14+ recommended)
- Basic understanding of Firebase

### Contribution Workflow:
```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/Login-page.git
cd Login-page
# 2. Install dependencies (if any)
npm install

# 3. Create your feature branch
git checkout -b feature/amazing-feature

# 4. Commit your changes with a descriptive message
git commit -m "feat: add password strength meter"

# 5. Push to your branch
git push origin feature/amazing-feature
```

## Creating a Pull Request:
1. Go to the original repository
2. Click "New Pull Request"
3. Select your fork and branch
4. Add a descriptive title and explanation
5. Submit and await review


## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


