import mongoose , {Schema , Document , Model} from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}


const userSchema = new Schema ({
    name:{
        required:[true , "Name Field Required"],
        type: Schema.Types.String,
    },
    email:{
        required:[true , "email Field Required"],
        type: Schema.Types.String,
    },
    password:{
        required:[true , "password Field Required"],
        type: Schema.Types.String,
    },
    role:{
        required:false,
        type: Schema.Types.String,
        default: "User"
    }
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);


export default User;