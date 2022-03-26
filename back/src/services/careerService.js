import { Career } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { SubrecordService } from "./BaseService";
import { Logger, UNIFIED_LOG } from "../utils/logging";

class CareerService extends SubrecordService {
    // Inherit from BaseService
    Model = Career;

    // deletable = true;

    requiredFields = Object.freeze(["id", "user_id", "title", "from_date"]);
    optionalFields = Object.freeze(["to_date", "description"]);
    settableFields = Object.freeze([
        "title",
        "description",
        "from_date",
        "to_date",
    ]);
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
    name: "careerService",
    tee: [
        UNIFIED_LOG,
        Logger.generateLogPath("career.log"),
        Logger.generateLogPath("service.log"),
        Logger.generateLogPath("careerservice.log"),
    ],
});

const careerService = new CareerService({ logger });

export { careerService };
