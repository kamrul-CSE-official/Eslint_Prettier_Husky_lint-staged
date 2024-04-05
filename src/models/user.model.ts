import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import envConfig from "../configs/envConfig";

// Define interfaces
export interface IUser {
  name: string;
  email: string;
  gender: "Male" | "Female" | "Other"; 
  img?: string;
  password: string;
  role: string;
}

interface IUserDocument extends IUser, Document {}
interface IUserModel extends Model<IUserDocument> {
  isUserExist(email: string): Promise<IUserDocument | null>;
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
}

// Define User Schema
const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  img: { type: String, default: "https://i.ibb.co/bP8sJzJ/user.png" },
  password: { type: String, required: true, minlength: 6, select: false }, 
  role: { type: String, default: "General" },
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre<IUserDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(envConfig.bcrypt));
  }
  next();
});

// Static methods
userSchema.statics.isUserExist = function (email: string) {
  return this.findOne({ email }).select("name img password email _id role");
};

userSchema.statics.isPasswordMatched = async function (givenPassword: string, savedPassword: string) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Create and export User model
const User = model<IUserDocument, IUserModel>("User", userSchema);
export default User;
