import bcrypt from 'bcryptjs';
import { connect } from '@/database/mongo.config';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';

// Establish MongoDB connection
connect(); // Ensure that connect() does not expect any arguments

export async function POST(request: NextRequest) {
    try {
        // Generate salt for hashing
        const salt = bcrypt.genSaltSync(10);

        // Hash the admin password using bcrypt
        const hashedPassword = bcrypt.hashSync('@#Mustafa13579#@', salt);

        // Create a new admin user with the hashed password
        await User.create({
            name: "Admin", // Provide the name for the admin user
            email: "mustafabhikhapurwala@gmail.com",
            password: hashedPassword,
            role: "Admin"
        });

        // Respond with success message
        return NextResponse.json({ status:200 , message: 'Admin user created successfully' });
    } catch (error) {
        // Handle any errors that occur during user creation
        console.error('Error creating admin user:', error);
        return NextResponse.error();
    }
}
