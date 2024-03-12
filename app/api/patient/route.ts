import { connect } from "@/database/mongo.config";
import Consulting from "@/model/Consulting";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      await connect();
      const patient = await Consulting.find({});
      
      return new NextResponse(JSON.stringify(patient), {
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


