import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IConsulting extends Document {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  email: string;
  phoneNumber: string;
  consultingDate: Date;
  complaints: string;
  prescription: string,
  
}

const ConsultingSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  consultingDate: { type: Date, default: Date.now },
  complaints: { type: String, required: true },
  prescription: { type: String, required: false},
});

const Consulting: Model<IConsulting> = mongoose.models.Consulting || mongoose.model<IConsulting>('Consulting', ConsultingSchema);

export default Consulting;