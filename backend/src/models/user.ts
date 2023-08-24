import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, unique: true,max:10, required: true },
    email: { type: String, unique: true, required: true, max:50, select: false },
    password: { type: String, required: true,min:6, select: false },
    profilePicture: { type: String, default: ""},
    bio: { type: String, min:250 },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
