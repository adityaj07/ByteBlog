import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const blogPostSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, required: true},
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags:{type: Array}
  },
  { timestamps: true }
);

type BlogPost = InferSchemaType<typeof blogPostSchema>;
export default model<BlogPost>("blogpost", blogPostSchema);
