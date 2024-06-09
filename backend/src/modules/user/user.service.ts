import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { RESPONSE_DATA } from 'src/common/responses';
import { User } from './interfaces/user.interface';


@Injectable()
export class UserService {
  constructor(
    private readonly userEntity: UserEntity,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      await this.userEntity.create(createUserDto);

      return [RESPONSE_DATA.SUCCESS, {}];
    } catch (error) {
      console.log('Error in createUser:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async updateUserDetails(updateUserDto: UpdateUserDto, userId: number) {
    try {

      const userData: User =   await this.userEntity.getUserById(userId) ;
      
      if(!userData){
        return [RESPONSE_DATA.USER_NOT_EXIST, {}];
      }

      await this.userEntity.updateUserById(userId,updateUserDto);

      return [RESPONSE_DATA.SUCCESS, {}];
    } catch (error) {
      console.log('Error in updateUserDetails:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async deleteUser(userId: number) {
    try {

      await this.userEntity.deleteUserById(userId);

      return [RESPONSE_DATA.SUCCESS, {}];
    } catch (error) {
      console.log('Error in deleteUser:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async getUsersListing() {
    try {

      const userList: User[] = await this.userEntity.getAllUsers();

      return [RESPONSE_DATA.SUCCESS, userList];
    } catch (error) {
      console.log('Error in getUsersListing:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async getUserDetails(userId: number) {
    try {

      const userList: User = await this.userEntity.getUserById(userId);

      return [RESPONSE_DATA.SUCCESS, userList];
    } catch (error) {
      console.log('Error in getUserDetails:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }
}
