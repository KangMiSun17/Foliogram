import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { SubrecordService } from "./BaseService";
import { Logger, UNIFIED_LOG } from "../utils/logging";

class EducationService extends SubrecordService {
    // Inherit from BaseService
    Model = Education;

    // deletable = true;

    requiredFields = Object.freeze([
        "id",
        "user_id",
        "school",
        "major",
        "position",
    ]);
    optionalFields = Object.freeze([]);
    settableFields = Object.freeze(["school", "major", "position"]);
    // uniqueFields = Object.freeze([]);
    // searchableFields = Object.freeze([]);

    // authField = "user_id";
    // refFields = Object.freeze({});

    allFields = Object.freeze([...this.requiredFields, ...this.optionalFields]);

    // logger;

    // Inherit from SubrecordService
    // ownerField = "user_id";

    // Here we override some methods to reduce degree of freedom.
    // Too many choices can be bad if the routers get funny ideas.
    // Freedom is very expensive indeed.

    async get({ id }) {
        return super.get({ id });
    }

    async del({ id, currentUserId }) {
        return super.del({ id, currentUserId });
    }

    async getParent({ id }) {
        return super.getParent({ id });
    }
}

const logger = new Logger({
    name: "educationService",
    tee: [
        UNIFIED_LOG,
        Logger.generateLogPath("education.log"),
        Logger.generateLogPath("service.log"),
        Logger.generateLogPath("educationservice.log"),
    ],
});

const educationService = new EducationService({ logger });

export { educationService };
