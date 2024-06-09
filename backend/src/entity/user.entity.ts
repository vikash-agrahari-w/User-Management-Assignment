import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/dto/user.dto';
import { Dao } from 'src/providers/database/dao.provider';
import { IUser } from 'src/schema/user.schema';

@Injectable()
export class UserEntity extends Dao {
  constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto) {
    await this.saveData(createUserDto);
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneAndUpdate({ id }, updateUserDto);
  }

  async deleteUserById(id: number) {
    await this.deleteOne({ id });
  }

  async getAllUsers() {
    const users = await this.userModel.find(
      {},
      { createdAt: 0, updatedAt: 0, _id: 0 },
    );

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    }));
  }

  async getUserById(id: number) {
    return await this.findOne({ id }, { createdAt: 0, updatedAt: 0, _id: 0 });
  }
}
