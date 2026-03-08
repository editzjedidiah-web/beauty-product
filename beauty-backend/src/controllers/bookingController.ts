import { Responce } from 'express';
import { Booking, Service, User } from '../models';
import { AuthRequest } from '../middleware/auth;

// Create a new booking
export const createBooking = async (req: AuthRequest, res: Responce) => {
  try {
    const { serviceId, appointmentDate } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const booking =await Booking.create({
      userId,
      serviceId,
      appointmentDate,
      status: 'pending' 
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create booking', error });
  } 
};

//Get bookings for the logged-in user 
export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Service, attributes: ['name', 'price', 'duration'] }]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

//Admin: Get all bookings across the system 
export const getAllBookinings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {model: User, attributes: ['email'] },
        {model: Service, attributes: ['name'] }
      ]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all bookings', error });
  }
};
