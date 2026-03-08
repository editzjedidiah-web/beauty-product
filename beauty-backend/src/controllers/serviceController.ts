import { Request, Responce } from'express';
import {Service } from '../models';

export const getAllService = async (req: Request, res: Responce) => {
  const services = await Service.findAll();
  res.json(services);
};

export const creativeService = async (req: Request, res: Responce) => {
  try{
    const service = await Service.create(req.body);
    res.status(201).json(service); 
  } catch (error) {
    res.status(400).json({ message: 'Error creatingservice', error});
  }
};
