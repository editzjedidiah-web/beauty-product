import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

// 1. Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 2. Configure S3 Storage Engine
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    acl: 'public-read', // Allows the frontend to view the images via URL
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, `uploads/${file.fieldname}/${fileName}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB per file 
});

// 3. Define specific fields for the Registration Form [cite: 6]
export const registrationUpload = upload.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'portfolio', maxCount: 5 },
  { name: 'certifications', maxCount: 3 }
]);
