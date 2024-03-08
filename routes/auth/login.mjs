import express from 'express';
import { Logger } from 'logger-ts-node';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const prisma = new PrismaClient();

  const data = req.body;

  const email = data.email;
  const password = data.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Bad request' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    };

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // you have to make session for the user here.
    // use express-session or any other library to make session
    // and use 

    // for now, lets say you have a session for the user
    // and you can send the user data to the client

    return res.status(200).json({ email: user.email, name: user.name , sid: '<session id>' });
  } catch (error) {
    Logger.error('Error during login:', error);
    return res.status(500).json({ error: 'Failed to log in' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;