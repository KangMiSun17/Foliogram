import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        target_user_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
