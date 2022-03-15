import { AwardModel } from "../schemas/award";

/** Static container class for award model.
 * 
 * @class
 */
class Award {
  static async create({ newAward }) {
    const award = await AwardModel.create(newAward);
    return award;
  }

  static async findById({ award_id }) {

  }

  static async findByName({ name }) {

  }

  static async searchByName({ name }) {
    // const award = await AwardModel.findOne({ email });
    // return award;
  }

  static async searchByDescription({ keyword }) {
    // const award = await AwardModel.findOne({ id: award_id });
    // return award;
  }

  static async searchByAwardee({ user }) {
    // const awards = await AwardModel.find({});
    // return awards;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    // const filter = { id: award_id };
    // const update = { [fieldToUpdate]: newValue };
    // const option = { returnOriginal: false };

    // const updatedUser = await AwardModel.findOneAndUpdate(
    //   filter,
    //   update,
    //   option
    // );
    // return updatedAward;
  }
}

export { Award };
