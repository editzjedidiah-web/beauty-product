import { Router } 'express';
import { getAllServices, createService } from '../controllers/serviceControllers';
import { authenticJWT } from '../middleware/auth';
import { authorizeRole } from '../middleware/roleAuth';

const router  Router();

router.get('/', getAllServices); //Public: See what we offer
router.post('/', authenticateJWT, authorizeRole('admin'), createService); //Admin Only

export default router;
