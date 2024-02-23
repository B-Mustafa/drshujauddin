import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  email: string;
  phoneNumber: string;
  appointmentDate: string;
  complaints: string;
}

const appointmentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  complaints: { type: String, required: true },
});

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;