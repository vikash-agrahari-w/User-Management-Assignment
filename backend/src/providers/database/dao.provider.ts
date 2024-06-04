import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { RESPONSE_MSG } from 'src/common/responses';
@Injectable()
export class Dao {
  public ObjectId = Types.ObjectId;
  protected modelName;

  constructor(model: any) {
    this.modelName = model;
  }

  async saveData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .create(data)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[saveData]', JSON.stringify(data), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }

  async findOne(
    query: any,
    projection: any = {},
    options: any = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findOne(query, projection, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(
            '[MongoDB]',
            '[findOne]',
            JSON.stringify(query, projection),
            err,
          );
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }

  async findOneAndUpdate(
    conditions: any,
    update: any,
    options: any = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findOneAndUpdate(conditions, update, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(
            '[MongoDB]',
            '[findOneAndUpdate]',
            JSON.stringify(conditions),
            err,
          );
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }

  async findAll(
    query: any,
    projection: any = {},
    options: any = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .find(query, projection, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(
            '[MongoDB]',
            '[findAll]',
            JSON.stringify(query, projection),
            err,
          );
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }

  async findAllPaginated(
    query: any,
    projection: any = {},
    options: any = {},
    page = 0,
    size = 10,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .find(query, projection, options)
        .skip(page * size)
        .limit(size)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(
            '[MongoDB]',
            '[findAllPaginated]',
            JSON.stringify(query, projection),
            err,
          );
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }

  async deleteOne(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .deleteOne(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[deleteOne]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }
}
