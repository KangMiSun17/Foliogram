import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentService } from "../services/commentService";
import { RequestError } from "../utils/errors";
import * as status from "../utils/status";

const commentRouter = Router();

commentRouter.post(
    "/comments/create",
    login_required,
    async function (req, res, next) {
        try {
            if (is.emptyObject(req.body)) {
                throw new RequestError(
                    `headers["Content-Type"] needs to be "application/json"`
                );
            }

            const target_user_id = req.body.target_user_id ?? null;
            const content = req.body.content ?? null;
            const user_id = req.body.user_id;

            if (!content || !target_user_id || !user_id) {
                throw new Error("user_id,target_user_id,content are required");
            }
            if (user_id !== req.currentUserId) {
                throw new RequestError(
                    { status: status.STATUS_403_FORBIDDEN },
                    `Trying to create different user's comments`
                );
            }

            const newComment = await commentService.addComment({
                content,
                user_id,
                target_user_id,
            });

            res.status(status.STATUS_201_CREATED).json(newComment);
        } catch (error) {
            next(error);
        }
    }
);
commentRouter.get("/commentlist/:user_id", async function (req, res, next) {
    try {
        const user_id = req.params.user_id;
        const comments = await commentService.getComments({
            user_id,
        });
        res.status(status.STATUS_200_OK).json(comments);
    } catch (error) {
        next(error);
    }
});
commentRouter.get(
    "/comments/:id",
    login_required,
    async function (req, res, next) {
        try {
            const id = req.params.id;

            const comment = await commentService.getComment({
                id,
            });
            if ("errorMessage" in comment) {
                throw new RequestError(
                    { status: comment.statusCode },
                    comment.errorMessage
                );
            }
            res.status(status.STATUS_200_OK).json(comment);
        } catch (error) {
            next(error);
        }
    }
);
commentRouter.put(
    "/comments/:id",
    login_required,
    async function (req, res, next) {
        try {
            const id = req.params.id;
            const user_id = req.currentUserId;
            const comment = await commentService.getComment({ id });

            if ("errorMessage" in comment) {
                throw new RequestError(
                    { status: comment.statusCode },
                    comment.errorMessage
                );
            }

            if (user_id === comment.user_id.id) {
                const content = req.body.content ?? null;
                const toUpdate = { content };

                const updatedEducation = await commentService.setComment({
                    id,
                    toUpdate,
                    comment,
                });
                res.status(status.STATUS_200_OK).json(updatedEducation);
            } else {
                throw new RequestError(
                    { status: status.STATUS_403_FORBIDDEN },
                    `User is not an owner of the comment id ${id}`
                );
            }
        } catch (error) {
            next(error);
        }
    }
);

commentRouter.delete(
    "/comments/:id",
    login_required,
    async function (req, res, next) {
        try {
            const id = req.params.id;
            const user_id = req.currentUserId;
            const comment = await commentService.getComment({ id });
            console.log(comment);

            if ("errorMessage" in comment) {
                throw new RequestError(
                    { status: comment.statusCode },
                    comment.errorMessage
                );
            }

            if (user_id === comment.user_id.id) {
                const result = await commentService.deleteComment({
                    id,
                });
                res.status(status.STATUS_200_OK).json(result);
            } else {
                throw new RequestError(
                    { status: status.STATUS_403_FORBIDDEN },
                    `User is not an owner of the comment id ${id}`
                );
            }
        } catch (error) {
            next(error);
        }
    }
);
export { commentRouter };
