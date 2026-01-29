const validate = {
  registerInput: (req, res, next) => {
    let { name, email, password, mobileno } = req.body;
    const error = {};

    // Convert and sanitize inputs
    name = String(name || "").trim();
    email = String(email || "").trim();
    password = String(password || "");
    mobileno = String(mobileno || "").trim();

    // Name validation
    if (!name || name.length < 3) {
      error.name = "Name must be atleast 3 letters.";
    }

    // Email validation - standard email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      error.email = "Invalid Email Address.";
    }

    // Password validation
    if (!password || password.length < 8) {
      error.password = "Password must be atleast 8 characters.";
    }

    // Mobile number validation - ensure it's a string with exactly 10 digits
    if (!mobileno || !/^\d{10}$/.test(mobileno)) {
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
      console.log("validastion error:", error);

      return res.status(400).json({
        success: false,
        error,
      });
    }

    next();
  },
};

export default validate;
