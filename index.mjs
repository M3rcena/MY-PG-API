import { Logger } from 'logger-ts-node';

import express from 'express';
const app = express();
const PORT = 8080;

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

app.listen(
    PORT,
    () => Logger.info(`Server is listening on port ${PORT}`)
)

app.post('/api/login', async (req, res) => {
    const prisma = new PrismaClient();
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { error: 'Invalid email or password' };
      };

      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (isValidPassword) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      Logger.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to log in' });
    } finally {
      await prisma.$disconnect();
    }
  });

app.get('/api/post', (req, res) => {
    res.status(200).send({
      test: 'Post created successfully!'
    })
});