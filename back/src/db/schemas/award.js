import { Schema, model } from "mongoose";

/** Schema representing an individual award.
 * 
 * @field {String} name
 * @field {String} description
 * @field {User} awardee
 **/
const AwardSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: "설명이 아직 없습니다. 추가해 주세요."
        },
        awardee: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: false,
    }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
