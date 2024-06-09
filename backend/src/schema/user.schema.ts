import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { ENUM } from 'src/common/enum';


export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const UserSchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.Number },
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    phone: { type: Schema.Types.String, required: true },
    address: { type: Schema.Types.String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this as IUser & Document;
  const UserModel = this.constructor as mongoose.Model<IUser>;

  const users = await UserModel.find().sort({ id: -1 }).limit(1);

  if (users.length === 0) {
    user.id = 1;
  } else {
    user.id = users[0].id + 1;
  }
  next();
});
