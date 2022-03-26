import { CommentModel } from "../schemas/comment";

class Comment {
    static async create({ newComment }) {
        const createdNewComment = await CommentModel.create(newComment);
        return createdNewComment;
    }

    static async searchByUserId({ user_id }) {
        const comments = await CommentModel.find({
            target_user_id: user_id,
        }).sort({ createdAt: 1 });
        return comments;
    }

    static async findById({ id }) {
        const comment = await CommentModel.findOne({ id }).populate("user_id");
        return comment;
    }

    static async update({ id, fieldToUpdate, newValue }) {
        const filter = { id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedComment = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedComment;
    }

    static async delete({ id }) {
        const result = await CommentModel.deleteOne({ id });
        return result;
    }
    static async deleteAll({ user_id, od }) {
        const target_result = await CommentModel.deleteMany({
            target_user_id: user_id,
        });
        const result = await CommentModel.deleteMany({
            user_id: od,
        });
        return { target_result, result };
    }
}

export { Comment };
