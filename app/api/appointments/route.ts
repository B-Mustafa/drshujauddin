import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../database/mongo.config'; // Adjust the path as necessary
import Appointment from '../../../model/Appointment'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

export  async function GET(request : Request) {
  if (request.method === 'GET') {
    await connect(); // Connect to MongoDB

    try {
      const appointments = await Appointment.find({});
      NextResponse.json(appointments);
    } catch (error: unknown) {
      console.log(error)
    }
}
}