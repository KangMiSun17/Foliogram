import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByEmail({ email }) {
    const award = await AwardModel.findOne({ email });
    return award;
  }

  static async findById({ award_id }) {
    const award = await AwardModel.findOne({ id: award_id });
    return award;
  }

  static async findAll() {
    const awards = await AwardModel.find({});
    return awards;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
}

export { Award };
