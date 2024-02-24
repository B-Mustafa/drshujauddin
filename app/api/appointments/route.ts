import { connect } from '../../../database/mongo.config';
import Appointment from '@/model/Appointment';
import { NextResponse } from 'next/server'; 


export async function GET() {
  try {
    
    await connect();

    
    const appointments = await Appointment.find({});

    
    return new NextResponse(JSON.stringify(appointments), {
      status:  200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    
    return new NextResponse(JSON.stringify({ error: 'Error fetching appointments' }), {
      status:  500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
