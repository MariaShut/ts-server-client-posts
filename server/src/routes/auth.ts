import { Router } from 'express';
import { z } from 'zod';

import { authorizeResponse, unauthorizeResponse } from '../auth.js';
import { IUser, Users, Passwords } from '../database';

export const authRouter = Router();

const AuthSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
});

authRouter.post('/register', async (req, res) => {
  const bodyParseResult = AuthSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.message);
  }

  const { username, password } = bodyParseResult.data;

  let user: IUser;

  try {
    user = await Users.create(username);
  } catch (error) {
    return res.status(409).send('Это имя пользователя уже занято');
  }

  await Passwords.create(user.id, password);

  authorizeResponse(res, user.id).status(201).json({ id: user.id });
});

authRouter.post('/login', (req, res) => {
  const bodyParseResult = AuthSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.message);
  }

  const { username, password } = bodyParseResult.data;

  const user = Users.findOne((user) => user.username === username);

  if (!user || !Passwords.verify(user.id, password)) {
    return res.status(401).send('Неверное имя пользователя или пароль');
  }

  authorizeResponse(res, user.id).status(200).send();
});

authRouter.post('/logout', (req, res) => {
  unauthorizeResponse(res).status(200).send();
});
