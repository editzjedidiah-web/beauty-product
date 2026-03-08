import { Router } from 'express';
import { addToWishlist, getMyWishlist, removeFromWishlist } from '../controllers/wishlistController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

//Protect all wishlist routes
router.use(authenticateJWT);

router.get('/', getMyWishlist);               //View my saved products
router.post('/', addToWishlist);              //Save a product
router.delete('/:productId', removeFromWishlist);  //Remove a product

export default router;
