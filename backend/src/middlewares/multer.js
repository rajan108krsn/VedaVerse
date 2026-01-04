import multer from "multer";

const storage = multer.diskStorage({}); // temp storage

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
  

// Ye code Multer ka use karke sirf image files upload allow karta hai aur baaki sab files reject kar deta hai.