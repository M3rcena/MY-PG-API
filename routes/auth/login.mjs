import express from 'express';
import { Logger } from 'logger-ts-node';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const router = express.Router();

// Configure session
const sessionOptions = {
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdFunction: undefined,
      dbRecordIdIsSessionId: true,
    }
  )
}
router.use(session(sessionOptions));

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

    req.session.user = user.id;

    return res.status(200).json({ email: user.email, name: user.name , sid: req.sessionID });
  } catch (error) {
    Logger.error('Error during login:', error);
    return res.status(500).json({ error: 'Failed to log in' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;