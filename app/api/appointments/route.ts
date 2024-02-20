import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/database/mongo.config';
import Appointment from '@/model/Appointment';
import mongoose from 'mongoose';

export async function post(req: NextApiRequest, res: NextApiResponse) {
  // Connect to MongoDB
  await connect();

  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    // Type assertion to Error
    const err = error as Error;
    res.status(400).json({ error: err.message });
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
  }
}