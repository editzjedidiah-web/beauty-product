import { Request, Responce } from 'express';
import { Product } from '../models';

export const getAllProducts = async (req: Request, res: Responce) => {
  const products = await Product.findAll();
  res.json(products); 
};

export const createProduct = async (req: Request, res: Responce) => {
  try {
    const product = await Product.create(req.body):
    res.json(products); 
  }; 

  export cont createProduct = async (req: Request, res: Responce) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product); 
    } cath (error) {
      res.status(400).json({ message: 'Error creating product', error }); 
    } 
  };
  
