import bcrypt from 'bcryptjs';
import { connect } from '@/database/mongo.config';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/User';

// Establish MongoDB connection
connect(); // Ensure that connect() does not expect any arguments

export async function POST(request: NextRequest) {
    try {
        // Ensure process.env.AdminPassword and process.env.AdminEmail are defined
        if (!process.env.AdminPassword || !process.env.AdminEmail) {
            throw new Error('Admin password or email is not provided');
        }

        // Generate salt for hashing
        const salt = bcrypt.genSaltSync(10);

        // Hash the admin password using bcrypt
        const hashedPassword = bcrypt.hashSync(process.env.AdminPassword, salt);

        // Create a new user with the hashed password
        await User.create({
            email: process.env.AdminEmail,
            password: hashedPassword,
            role: "Admin"
        });

        // Respond with success message
        return NextResponse.json({ message: 'Admin user created successfully' });
    } catch (error) {
        // Handle any errors that occur during user creation
        console.error('Error creating admin user:', error);
     
    }
}
