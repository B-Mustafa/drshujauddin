import EmailTemplate from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function GET() {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data } = await resend.emails.send({
            from: 'bhikhapurmustafa@mustafadev.me', //replace with the domain same as resend
            to: 'mustafabhikhpurwala@gmail.com',
            subject: 'Appointment Confirmation',
            react: EmailTemplate({}) 
        });
        return NextResponse.json({data});
    } catch (error) {
        return NextResponse.json({error});
    }
}