/**
 * @file response
 * @description defines response for entity
 */

import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MSG = {
  SUCCESS: 'Success.',
  ERROR: 'Something went wrong.',
  USER_NOT_EXIST: 'User not exists.',
  INVALID_AUTHORIZATION_TOKEN: 'Invalid authorization token.',
  DATA_NOT_FOUND: 'No user data found.',
  PDF_NOT_FOUND: 'PDF not found.',
};

export const RESPONSE_DATA = {
  SUCCESS: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.SUCCESS,
  },
  ERROR: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.ERROR,
  },
  DATA_NOT_FOUND: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.DATA_NOT_FOUND,
  },
  PDF_NOT_FOUND: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.PDF_NOT_FOUND,
  },
  USER_NOT_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.USER_NOT_EXIST,
  },
};
