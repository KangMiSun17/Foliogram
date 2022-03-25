import { Schema, model } from "mongoose";
import { RE_DATE_PATTERN } from "../../utils/regexTools";

const dateValidator = {
    // Needs to be YYYY-MM-DD format.
    // date.toISOString().slice(0, 10) does that.
    validator: (v) => {
        return (
            RE_DATE_PATTERN.test(v) && new Date(v).toString() !== "Invalid Date"
        );
    },
    message: "Not a correct date format, should be YYYY-MM-DD",
};

const CertificateSchema = new Schema(
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
        when_date: {
            type: String,
            required: true,
            validate: dateValidator,
        },
        description: {
            type: String,
            required: false,
            default: "설명이 아직 없습니다. 추가해 주세요.",
        },
    },
    {
        timestamps: true,
    }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
