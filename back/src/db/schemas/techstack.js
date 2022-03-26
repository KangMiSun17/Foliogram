import { Schema, model } from "mongoose";

/** Schema representing an individual tech stack.
 *
 * @field {uuid} id
 * @field {uuid} user_id
 * @field {string} title
 * @field {string} [description]
 **/
const TechStackSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: "설명이 아직 없습니다. 추가해 주세요.",
        },
    },
    {
        timestamps: false,
    }
);

const TechStackModel = model("TechStack", TechStackSchema);

export { TechStackModel };
