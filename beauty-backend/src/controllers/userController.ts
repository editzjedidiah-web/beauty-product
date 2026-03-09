import { Request, Response } from 'express';
import { User } from '../models';
import { verifyAadharWithVendor } from '../services/aadharService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, aadharNumber } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Check for required Aadhar image upload [cite: 6]
    if (!files || !files['aadharCard']) {
      return res.status(400).json({ message: 'Aadhar Card image is required' });
    }

    // 2. Perform Aadhar Verification 
    try {
      await verifyAadharWithVendor(aadharNumber, files['aadharCard'][0]);
    } catch (verificationError: any) {
      // Return specific error message for frontend toast notifications 
      return res.status(400).json({ message: verificationError.message });
    }

    // 3. Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone Number or Email already registered' });
    }

    // 4. Create User after successful verification
    const newUser = await User.create({ email, password, role, aadharNumber });

    res.status(201).json({
      success: true,
      message: 'User registered and Aadhar verified successfully',
      user: { id: newUser.id, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};
