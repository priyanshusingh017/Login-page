# Login Page

A clean, responsive login page with form validation, built with HTML, CSS, and JavaScript.

Login page live: [Demo](https://priyanshusingh017.github.io/Login-page/)

<div align="center">
  <img src="demo.gif" alt="Demo" width="100%">
</div>

## Features

- Modern UI design with gradient background
- Responsive layout (mobile & desktop compatible)
- Client-side form validation (email & password)
- Remember me checkbox functionality
- Forgot password link placeholder
- Social login buttons (Google, Facebook, Twitter)
- Background video integration option
- Interactive error/success messages

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Font Awesome (for icons)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/priyanshusingh017/Login-page.git
   cd Login-page

## Open in your preferred browser:

- Simply open `index.html` in any modern browser
- Or use Live Server extension in VS Code

## Usage

1. Open the login page
   
3. Enter valid credentials:
   - Email: must be valid format (`user@example.com`)
   - Password: minimum 8 characters
     
4. Options:
   - Check "Remember me" to save email (uses `localStorage`)
   - Click "Forgot Password" for recovery options
   - Use social login buttons (placeholder functionality)
     
5. Click "Login" to submit

## Customization

### Basic Customization:
1. Edit colors in `style.css` (CSS variables at the top)
2. Replace logo in `index.html`
3. Update form action in `script.js`

## JavaScript Features

Key functionality implemented:
- ✅ Form validation with error messages
- 💾 Remember me using `localStorage`
- 🎬 Animated transitions
- 🔄 Mock AJAX login request
- 📱 Responsive menu toggle (for mobile)
  
  ```javascript
  // Example of form validation code
  function validateForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!email.includes('@')) {
    showError('Please enter a valid email');
    return false;
  }
  
  if (password.length < 8) {
    showError('Password must be at least 8 characters');
    return false;
  }
  
  return true;
  }

## Contributing
Contributions welcome! Please follow these steps:

Step-by-step contribution guide
1. Fork the repository
2. Create a feature branch: git checkout -b feature/your-feature
3. Commit your changes: git commit -m 'Add your feature'
4. Push to the branch: git push origin feature/your-feature
5. Open a Pull Request on GitHub

## License
📜 MIT License





