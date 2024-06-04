import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { ENUM } from 'src/common/enum';

export const schemaProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.USER, UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
