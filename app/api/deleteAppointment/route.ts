import { connect } from "@/database/mongo.config";
import Appointment from "@/model/Appointment";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
       await connect(); 
   
       const urlParts = req.url?.split('?');
       const queryParameters = new URLSearchParams(urlParts ? urlParts[1] : '');
       const id = queryParameters.get('id');
   
       if (!id || typeof id !== 'string') {
         return new NextResponse(JSON.stringify({ error: 'Invalid appointment ID' }), {
           status: 400,
           headers: {
             'Content-Type': 'application/json',
           },
         });
       }
   
       const deleteAppointment = await Appointment.findByIdAndDelete(id);
   
       if (!deleteAppointment) {
         return new NextResponse(JSON.stringify({ error: 'Appointment not found' }), {
           status: 404,
           headers: {
             'Content-Type': 'application/json',
           },
         });
       }
   
       return new NextResponse(JSON.stringify({ message: 'Appointment deleted successfully' }), {
         status: 200,
         headers: {
           'Content-Type': 'application/json',
         },
       });
    } catch (error) {
       console.error('Error deleting appointment:', error);
       return new NextResponse(JSON.stringify({ error: 'Error deleting appointment' }), {
         status: 500,
         headers: {
           'Content-Type': 'application/json',
         },
       });
    }
   }
   