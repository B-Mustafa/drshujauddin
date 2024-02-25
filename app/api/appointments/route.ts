import { connect } from '../../../database/mongo.config';
import Appointment from '@/model/Appointment';
import { NextRequest, NextResponse } from 'next/server';

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

import { Resend } from 'resend'; // Make sure to import your email sending service

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();

    if (body.action === 'accept' || body.action === 'decline') {
      const appointment = await Appointment.findById(body.appointmentId);
      if (appointment) {
        appointment.status = body.action;
        await appointment.save();

        // Initialize the email sending service
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Construct the email subject and body
        let emailSubject = '';
        let emailHTML = '';

        if (body.action === 'accept') {
          emailSubject = 'Appointment Accepted';
          emailHTML = constructEmailHTML(body, 'accepted');

        } else {
          emailSubject = 'Appointment Declined';
          emailHTML = constructEmailHTML(body, 'Declined');

        }

        // Send the email
        await resend.emails.send({
          from: "bhikhapurmustafa@mustafadev.me",
          to: appointment.email,
          subject: emailSubject,
          html: emailHTML
        });

        return new NextResponse(JSON.stringify({ message: 'Appointment status updated successfully and email sent' }), {
          status:   200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        return new NextResponse(JSON.stringify({ error: 'Appointment not found' }), {
          status:   404,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } else {
      return new NextResponse(JSON.stringify({ error: 'Invalid action' }), {
        status:   400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return new NextResponse(JSON.stringify({ error: 'Error updating appointment status' }), {
      status:   500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

function constructEmailHTML(body: any, action: string) {
  // Construct the email HTML based on the action
  // This is just a placeholder. You should adjust this to match your actual email content.
  return `
      <h1>Appointment ${action.charAt(0).toUpperCase() + action.slice(1)}</h1>
      <p>Your appointment has been ${action}.</p>
      <p>First Name: ${body.firstName}</p>
      <p>Last Name: ${body.lastName}</p>
      <p>Email: ${body.email}</p>
      <p>Age: ${body.age}</p>
      <p>Gender: ${body.gender}</p>
      <p>Phone Number: ${body.phoneNumber}</p>
      <p>Appointment Date: ${body.appointmentDate}</p>
      <p>Complaints: ${body.complaints}</p>
  `;
}
