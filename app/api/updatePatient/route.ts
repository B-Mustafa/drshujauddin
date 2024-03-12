  // app/api/updatePatient/route.tsx
import { connect } from "@/database/mongo.config";
import Consulting from "@/model/Consulting";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
   
       await connect();
   
       const urlParts = req.url?.split('?');
       const queryParameters = new URLSearchParams(urlParts ? urlParts[1] : '');
       const id = queryParameters.get('id');
   
       if (!id || typeof id !== 'string') {
         return new NextResponse(JSON.stringify({ error: 'Invalid patient ID' }), {
           status: 400,
           headers: {
             'Content-Type': 'application/json',
           },
         });
       }
   
       const requestBody = await req.json();
   
       const updatedPatient = await Consulting.findByIdAndUpdate(id, requestBody, { new: true });
   
       if (!updatedPatient) {
         return new NextResponse(JSON.stringify({ error: 'Patient not found' }), {
           status: 404,
           headers: {
             'Content-Type': 'application/json',
           },
         });
       }
   
       return new NextResponse(JSON.stringify(updatedPatient), {
         status: 200,
         headers: {
           'Content-Type': 'application/json',
         },
       });
    } catch (error) {
       console.error('Error updating patient:', error);
       return new NextResponse(JSON.stringify({ error: 'Error updating patient' }), {
         status: 500,
         headers: {
           'Content-Type': 'application/json',
         },
       });
    }
   }
   