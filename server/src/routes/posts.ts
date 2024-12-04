import { Router } from 'express';
import { z } from 'zod';

import { authorizeRequest } from '../auth.js';
import { IGetAllPostsOptions, Posts } from '../database';

export const postsRouter = Router();

const GetPostsSchema = z
  .object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    searchString: z.string().optional(),
    sortDirection: z.enum(['asc', 'desc']).default('desc'),
  })
  .transform(
    ({ page, pageSize, searchString, sortDirection }): IGetAllPostsOptions => ({
      page: page !== undefined ? Number(page) : undefined,
      pageSize: pageSize !== undefined ? Number(pageSize) : undefined,
      searchString,
      sortDirection,
    })
  );

postsRouter.get('/', (req, res) => {
  const queryParseResult = GetPostsSchema.safeParse(req.query);

  if (!queryParseResult.success) {
    return res.status(400).send(queryParseResult.error.message);
  }

  res.status(200).json(Posts.getAll(queryParseResult.data));
});

const CreatePostSchema = z.object({
  text: z.string().min(10),
});

postsRouter.post('/', async (req, res) => {
  const userId = authorizeRequest(req);

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  const bodyParseResult = CreatePostSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.message);
  }

  const { text } = bodyParseResult.data;

  const post = await Posts.create(text, userId);

  res.status(201).send(post.id);
});
