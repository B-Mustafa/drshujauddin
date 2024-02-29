// app/api/updatePatient/route.tsx
import { connect } from "@/database/mongo.config";
import Consulting from "@/model/Consulting";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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

    const deletedPatient = await Consulting.findByIdAndDelete(id);

    if (!deletedPatient) {
      return new NextResponse(JSON.stringify({ error: 'Patient not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify({ message: 'Patient deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
 } catch (error) {
    console.error('Error deleting patient:', error);
    return new NextResponse(JSON.stringify({ error: 'Error deleting patient' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
 }
}
