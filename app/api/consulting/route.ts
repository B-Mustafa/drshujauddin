import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connect } from '../../../database/mongo.config';
import Consulting from '@/model/Consulting'; 

export async function POST(request: NextRequest) {
    
    if (request.method === "POST") {
        
        await connect();

        try {
            const body = await request.json();

            
            const newConsulting = new Consulting({
                firstName: body.firstName,
                lastName: body.lastName,
                gender: body.gender,
                age: body.age,
                phoneNumber: body.phoneNumber,
                email: body.email,
                complaints: body.complaints,
                prescription: body.prescription,
                consultingDate: body.consultingDate, 
            });

            await newConsulting.save();

            
            return new NextResponse(JSON.stringify({ success: true, data: newConsulting }), {
                status:   200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: any) {
           
            return new NextResponse(JSON.stringify({ success: false, error: error.message }), {
                status:   500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } else {
       
        return new NextResponse(null, { status:   405 });
    }
}
