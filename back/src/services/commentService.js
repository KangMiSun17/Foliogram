import { Comment } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { User } from "../db";
import { v4 as uuidv4 } from "uuid";
import * as status from "../utils/status";

class commentService {
    static async addComment({ content, user_id, target_user_id }) {
        const id = uuidv4();
        const commentUserInfo = await User.findById({ user_id });
        const newComment = {
            id,
            content,
            target_user_id,
            user_id: commentUserInfo._id,
        };

        const createdNewComment = await Comment.create({
            newComment,
        });
        let populatedComment = await createdNewComment.populate("user_id");
        const data = {
            id: populatedComment.id,
            content: populatedComment.content,
            target_user_id: populatedComment.target_user_id,
            user_id: {
                id: populatedComment.user_id.id,
                email: populatedComment.user_id.email,
                name: populatedComment.user_id.name,
                profileImage: populatedComment.user_id.profileImage,
            },
            createdAt: populatedComment.createdAt,
            updatedAt: populatedComment.updatedAt,
        };
        return data;
    }

    static async getComment({ id }) {
        const comment = await Comment.findById({ id });

        if (!comment) {
            return {
                errorMessage: `record {${id}} not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }
        const populatedComment = await comment.populate("user_id");
        const data = {
            id: populatedComment.id,
            content: populatedComment.content,
            target_user_id: populatedComment.target_user_id,
            user_id: {
                id: populatedComment.user_id.id,
                email: populatedComment.user_id.email,
                name: populatedComment.user_id.name,
                profileImage: populatedComment.user_id.profileImage,
            },
            createdAt: populatedComment.createdAt,
            updatedAt: populatedComment.updatedAt,
        };
        return data;
    }

    static async deleteComment({ id }) {
        const { deletedCount } = await Comment.delete({ id });
        return { result: true };
    }

    static async getComments({ user_id }) {
        const comments = await Comment.searchByUserId({ user_id });
        if (comments.length <= 0) {
            return [];
        }
        const populatedComments = await Promise.all(
            comments.map((comment) => comment.populate("user_id"))
        );
        const data = populatedComments.map((populatedComment) => ({
            id: populatedComment.id,
            content: populatedComment.content,
            target_user_id: populatedComment.target_user_id,
            user_id: {
                id: populatedComment.user_id.id,
                email: populatedComment.user_id.email,
                name: populatedComment.user_id.name,
                profileImage: populatedComment.user_id.profileImage,
            },
            createdAt: populatedComment.createdAt,
            updatedAt: populatedComment.updatedAt,
        }));
        return data;
    }

    static async setComment({ id, toUpdate, comment }) {
        let populatedComment = comment;
        if (toUpdate.content) {
            const fieldToUpdate = "content";
            const newValue = toUpdate.content;
            comment = await Comment.update({
                id,
                fieldToUpdate,
                newValue,
            });
            populatedComment = await comment.populate("user_id");
        }
        const data = {
            id: populatedComment.id,
            content: populatedComment.content,
            target_user_id: populatedComment.target_user_id,
            user_id: {
                id: populatedComment.user_id.id,
                email: populatedComment.user_id.email,
                name: populatedComment.user_id.name,
                profileImage: populatedComment.user_id.profileImage,
            },
            createdAt: populatedComment.createdAt,
            updatedAt: populatedComment.updatedAt,
        };
        return data;
    }
}

export { commentService };
