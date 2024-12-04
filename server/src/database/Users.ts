import { randomUUID } from 'crypto';
import { JSONFilePreset } from 'lowdb/node';

export interface IUser {
  id: string;
  username: string;
}

export const database = await JSONFilePreset<Record<string, IUser>>(
  'users.json',
  {}
);

export class Users {
  static getOne(id: string): IUser | undefined {
    return database.data[id];
  }

  static getAll(): IUser[] {
    return Object.values(database.data);
  }

  static findOne(predicate: (users: IUser) => boolean): IUser | undefined {
    return Users.getAll().find(predicate);
  }

  static async create(username: string): Promise<IUser> {
    if (Users.findOne((user) => user.username === username)) {
      throw new Error('Username already in use');
    }

    const user: IUser = {
      id: randomUUID(),
      username,
    };

    await database.update((data) => {
      data[user.id] = user;
    });

    return user;
  }
}
