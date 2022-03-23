import { Schema, model } from "mongoose";

/** Schema representing an individual award.
 *
 * @field {uuid} id
 * @field {uuid} awardee_id
 * @field {String} title
 * @field {String} [description]
 **/
const AwardSchema = new Schema(
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

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
