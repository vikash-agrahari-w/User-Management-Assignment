import { Body, Controller, Delete, Get, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from 'src/common/httpResponse';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, QueryDto, UpdateUserDto } from './dto/user.dto';

@ApiTags('User Module')
@Controller('/')
export class UserController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly userService: UserService,
  ) {}

  @Post('/create')
  @ApiOperation({ summary: 'api to create new user' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async CreateUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const [status, result] = await this.userService.createUser(createUserDto);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }
  }

  @Put('/update')
  @ApiOperation({ summary: 'api to update user details' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async UpdateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Query() queryDto: QueryDto,
    @Res() response: Response,
  ) {
    try {
      const [status, result] = await this.userService.updateUserDetails(updateUserDto, queryDto.id);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'api to delete a user' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async DeleteUser(
    @Query() queryDto: QueryDto,
    @Res() response: Response,
  ) {
    try {
      const [status, result] = await this.userService.deleteUser(queryDto.id);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }
  }

  @Get('/list')
  @ApiOperation({ summary: 'api to get all users list' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async UserListing(
    @Res() response: Response,
  ) {
    try {
      const [status, result] = await this.userService.getUsersListing();
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }
  }

  @Get('/details')
  @ApiOperation({ summary: 'api to get details of a users by id' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async UserDetails(
    @Query() queryDto: QueryDto,
    @Res() response: Response,
  ) {
    try {
      const [status, result] = await this.userService.getUserDetails(queryDto?.id);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }
  }
}
