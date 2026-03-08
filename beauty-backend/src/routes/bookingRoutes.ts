import { Router } from 'express';
import { createBooking, getUserBookings, getAllBookings } from '../controllers/bookingController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRole } from '../middleware/roleAuth';

const router = Router();

//All booking routes require being logged in
router.use(authenticateJWT);

router.post('/', creatBooking);               //Customer creates a booking
router.get('/my' getUserBookings);           //Customer sees their history
router.get('/all', authorizeRole('admin'), getAllBookings);  // Admin only

export default router; 
