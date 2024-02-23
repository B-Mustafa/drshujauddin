import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// setting up mongoose here for storing in database

import mongoose from 'mongoose';
import { connect } from '../../../database/mongo.config'
import Appointment from '@/model/Appointment';

export async function POST(request: Request) {
    if (request.method === "POST") {

        //connect mongoose
        await connect();

        const resend = new Resend(process.env.RESEND_API_KEY);
        
        try {
            const body = await request.json();
            const recipientEmail = body.email;
            
            // Manually construct the email body using template literals
            const emailHTML = `
                <h1>Appointment Confirmation</h1>
                <p>First Name: ${body.firstName}</p>
                <p>Last Name: ${body.lastName}</p>
                <p>Email: ${body.email}</p>
                <p>Age: ${body.age}</p>
                <p>Gender: ${body.gender}</p>
                <p>Phone Number: ${body.phoneNumber}</p>
                <p>Appointment Date: ${body.appointmentDate}</p>
                <p>Complaints: ${body.complaints}</p>
            `;
            
            const { data } = await resend.emails.send({
                from: 'bhikhapurmustafa@mustafadev.me',  
                to: recipientEmail,  
                subject: 'Appointment Confirmation',
                html: emailHTML // Use the manually constructed HTML string
            });

            const newAppointment = new Appointment(body);
            await newAppointment.save();

            return NextResponse.json({ data });
        } catch (error: any) {
            return NextResponse.json({ error: error.message });
        }
    } else {
        return new NextResponse(null, { status:  405 });
    }
}
