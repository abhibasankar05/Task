export const validateLoginForm = (email, password) => {
    const errors = {};
  
    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
  
    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  
  export const validateSignupForm = (name, email, password) => {
    const errors = {};
  
    // Name validation
    if (!name) {
      errors.name = 'Name is required';
    }
  
    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
  
    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  