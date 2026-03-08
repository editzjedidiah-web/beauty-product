import { Router } from 'express';
import { getAllServices, createService } from '../controllers/serviceController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRole } from '../middleware/roleAuth';

const router = Router();

router.pet('/', getAllServices); //Public: See what we offer
router.post('/', authenticJWT, authorizeRole('admin'), createService); //Admin Only

export default router;
