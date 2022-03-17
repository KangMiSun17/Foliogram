import { Schema, model } from "mongoose";

/*
{
    "user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
    "title":"react 프로젝트",
    "description":"프론트엔드 역량을 키웠습니다!",
    "from_date":"2021-03-20",
    "to_date":"2021-04-20"
}
*/

/** Schema representing an individual project.
 *
 * @field {uuid} id
 * @field {uuid} participant_id
 * @field {String} title
 * @field {String} from_date
 * @field {String} to_date
 * @field {String} [description]
 **/
const ProjectSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        participant_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        from_date: {
            type: String,
            required: true,
        },
        to_date: {
            type: String,
            required: false,
            default: "THIS PROJECT ENDED WHEN YOU HAVE REPENTED ALL YOUR SINS",
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

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
