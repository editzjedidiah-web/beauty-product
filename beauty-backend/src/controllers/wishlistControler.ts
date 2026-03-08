import { Response } from 'express';
import { Wishlist, Product } from '../models';
import { AuthRequest } from '../middleware/auth';

// Add a product to the user's wishlist
export const addToWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    // Check if the link already exists to avoid duplicates
    const exists = await Wishlist.findOne({ where: { userId, productId } });
    if (exists) return res.status(400).json({ message: 'Product already in wishlist' });

    const item = await Wishlist.create({ userId, productId });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

// Get all items in the logged-in user's wishlist
export const getMyWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [{ model: Product, attributes: ['id', 'name', 'price', 'stock'] }]
    });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

// Remove an item from the wishlist
export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const userId = req.user?.id;

    const deleted = await Wishlist.destroy({
      where: { userId, productId }
    });

    if (!deleted) return res.status(404).json({ message: 'Item not found in wishlist' });
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item', error });
  }
};
