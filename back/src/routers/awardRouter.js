import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const awardRouter = Router();

awardRouter.get("/", async (req, res, next) => {
    res.json("awarded spam");
});

export { awardRouter };
