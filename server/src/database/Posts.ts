import { randomUUID } from 'crypto';
import { JSONFilePreset } from 'lowdb/node';

export interface IPost {
  id: string;
  text: string;
  authorId: string;
  createdAt: number;
}

const database = await JSONFilePreset<Record<string, IPost>>('posts.json', {});

export interface IGetAllPostsOptions {
  page?: number;
  pageSize?: number;
  searchString?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface IGetAllPostsResult {
  list: IPost[];
  pageCount: number;
}

export class Posts {
  static getOne(id: string): IPost | undefined {
    return database.data[id];
  }

  static getAll({
    page,
    pageSize,
    searchString,
    sortDirection = 'desc',
  }: IGetAllPostsOptions = {}): IGetAllPostsResult {
    let list = Object.values(database.data);
    let pageCount = 1;

    if (searchString) {
      list = list.filter((post) =>
        post.text.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (sortDirection) {
      list.sort((postA, postB) => {
        if (sortDirection === 'desc') {
          return postB.createdAt - postA.createdAt;
        } else {
          return postA.createdAt - postB.createdAt;
        }
      });
    }

    if (page !== undefined && pageSize !== undefined) {
      pageCount = Math.ceil(list.length / pageSize);
      list = list.slice(page * pageSize, (page + 1) * pageSize);
    }

    return {
      list,
      pageCount,
    };
  }

  static async create(text: string, authorId: string): Promise<IPost> {
    const post: IPost = {
      id: randomUUID(),
      text,
      authorId,
      createdAt: Date.now(),
    };

    await database.update((data) => {
      data[post.id] = post;
    });

    return post;
  }
}
