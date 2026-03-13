import express, { Request, Responce, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import userRoutes from './routes/userRoutes';
import serviceRoutes from './routes/serviceRoutes';
import productRoutes from './routes/productRoutes';
import bookingRoutes from './routes/bookingRoutes';
import wishlistRoutes from './routes/wishlistRoutes';

const app: Application = express();

//1. Standard Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2. Multer Setup for File Parsing
//For now, this stores files locally in 'uploads/'.
// We can later update this to route S3.
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null. '${Date.now()}=$file.originalname}')
  }
});
export const upload = multer({ storage });

// 3. Routes [cite: 11]
app.use('/api/users', userRoutes);
app.use('/api/service', servicesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);

//4. Global Error Handler
app.use((err: any, req: express.Request, res: express.Responce, next: express.NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error', 
  }); 
});

export default app;
