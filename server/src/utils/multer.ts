//src/utils/multer.js
import multer, { Multer } from "multer"; 

// Explicitly type 'upload' as 'Multer' to break the inference loop
const upload: Multer = multer({ 
  storage: multer.memoryStorage() 
});

export default upload;