const validate = {
  registerInput: (req, res, next) => {
    const { name, email, password, mobileno } = req.body;
    const error = {}; 

    // Name validation
    if (!name || name.trim().length < 3) {
      error.name = "Name must be atleast 3 letters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      error.email = "Invalid Email Address.";
    }

    // Password validation
    if (!password || password.length < 8) {
      error.password = "Password must be atleast 8 characters.";
    }

    // Mobile number validation
    if (!mobileno || mobileno.length !== 10) {
      error.mobileno = "Mobile no. must be of 10 digits.";
    }

    if (Object.keys(error).length > 0) {
      console.log(error);
      return res.status(400).json({
        success: false,
        error,
      });
    }

    next();
  },

  loginInput: (req, res, next) => {
    const { email, password } = req.body;
    const error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email || !emailRegex.test(email)) {
      error.email = "Invalid Email Address.";
    }

    // Password validation
    if (!password || password.length < 8) {
      error.password = "Password must be atleast 8 characters.";
    }

    if (Object.keys(error).length > 0) {
      console.log("validastion error:",error);
  
      return res.status(400).json({
        success: false,
        error,
      });
    }

    next();
  },
};

export default validate;
