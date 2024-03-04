import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Setting up mongoose here for storing in the database
import mongoose from 'mongoose';
import { connect } from '../../../database/mongo.config';
import Appointment from '@/model/Appointment';

export async function POST(request: NextRequest) {
    // Use NextRequest instead of Request for compatibility with Next.js
    if (request.method === "POST") {
        // Connect mongoose
        await connect();

        const resend = new Resend(process.env.RESEND_API_KEY);
        
        try {
            const body = await request.json();
            const recipientEmail = body.email;
            let emailSubject = '';
            let emailHTML = '';

            // Check if the request is for accepting or declining an appointment
            if (body.action === 'accept') {
                emailSubject = 'Appointment Accepted';
                emailHTML = `
                    <h1>Appointment Accepted</h1>
                    <p>Your appointment has been accepted.</p>
                    <p>First Name: ${body.firstName}</p>
                    <p>Last Name: ${body.lastName}</p>
                    <p>Email: ${body.email}</p>
                    <p>Age: ${body.age}</p>
                    <p>Gender: ${body.gender}</p>
                    <p>Phone Number: ${body.phoneNumber}</p>
                    <p>Appointment Date: ${body.appointmentDate}</p>
                    <p>Appointment Time: ${body.appointmentTime}</p>
                    <p>Complaints: ${body.complaints}</p>
                `;
            } else if (body.action === 'decline') {
                emailSubject = 'Appointment Declined';
                emailHTML = `
                    <h1>Appointment Declined</h1>
                    <p>Your appointment has been declined.</p>
                    <p>First Name: ${body.firstName}</p>
                    <p>Last Name: ${body.lastName}</p>
                    <p>Email: ${body.email}</p>
                    <p>Age: ${body.age}</p>
                    <p>Gender: ${body.gender}</p>
                    <p>Phone Number: ${body.phoneNumber}</p>
                    <p>Appointment Date: ${body.appointmentDate}</p>
                    <p>Appointment Time: ${body.appointmentTime}</p>
                    <p>Complaints: ${body.complaints}</p>
                `;
            } else {
                // Handle the case where the action is neither 'accept' nor 'decline'
                // This could be the initial appointment submission
                emailSubject = 'Appointment Booked';
                emailHTML = `
                    <h1>Appointment has been booked please wait for the acceptance mail</h1>
                    <p>First Name: ${body.firstName}</p>
                    <p>Last Name: ${body.lastName}</p>
                    <p>Email: ${body.email}</p>
                    <p>Age: ${body.age}</p>
                    <p>Gender: ${body.gender}</p>
                    <p>Phone Number: ${body.phoneNumber}</p>
                    <p>Appointment Date: ${body.appointmentDate}</p>
                    <p>Appointment Time: ${body.appointmentTime}</p>
                    <p>Complaints: ${body.complaints}</p>
                `;
            }

            const { data } = await resend.emails.send({
                from: 'bhikhapurmustafa@mustafadev.me',
                to: recipientEmail,
                subject: emailSubject,
                html: emailHTML 
            });

            
            if (body.action === 'accept' || body.action === 'decline') {
                const appointment = await Appointment.findById(body.appointmentId);
                if (appointment) {
                    appointment.status = body.action;
                    await appointment.save();
                }
            } else {
              
                const newAppointment = new Appointment(body);
                await newAppointment.save();
            }

       
            return new NextResponse(JSON.stringify({ data }), {
                status:  200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: any) {
           
            return new NextResponse(JSON.stringify({ error: error.message }), {
                status:  500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } else {
   
        return new NextResponse(null, { status:  405 });
    }
}
