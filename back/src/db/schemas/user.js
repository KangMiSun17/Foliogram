import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        // This is account activation state.
        // will be activated by verification email.
        // Decided to make it string instead of bool because...
        // well, ciphertext tends to become inordinately long.
        // So we just store user's activation key here(temporarily) and just
        // find it later when the user tries to activate his account.
        active: {
            type: String,
            required: false,
            // Needs to be "y" to be activated.
            default: "n",
        },
        // Made separate activation key field due to office hour suggestion
        activation_key: {
            type: String,
            required: false,
            default: "",
        },
        description: {
            type: String,
            required: false,
            default: "설명이 아직 없습니다. 추가해 주세요.",
        },
        profileImage: {
            type: String,
            required: false,
            default:
                "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        },
        user_category: {
            type: String,
            required: false,
            default: "전체",
        },
        user_mvp: {
            type: Array,
            required: false,
            default: [
                {
                    navName: "학력",
                    state: true,
                },
                {
                    navName: "수상이력",
                    state: true,
                },
                {
                    navName: "프로젝트",
                    state: true,
                },
                {
                    navName: "자격증",
                    state: true,
                },
                {
                    navName: "경력",
                    state: false,
                },
                {
                    navName: "기술스택",
                    state: false,
                },
            ],
        },
        following: {
            type: Array,
            required: false,
            default: [],
        },
        follower: {
            type: Array,
            required: false,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = model("User", UserSchema);

export { UserModel };
