import { UserModel } from "../schemas/user";

class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async findById({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        return user;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async update({ user_id, newValue }) {
        const filter = { id: user_id };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            newValue,
            option
        );
        return updatedUser;
    }
    static async delete({ id }) {
        const result = await UserModel.deleteOne({ id });
        return result;
    }
}

export { User };
