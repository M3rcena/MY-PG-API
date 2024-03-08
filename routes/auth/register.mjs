import express from 'express';
import { Logger } from 'logger-ts-node';

const router = express.Router();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

router.post('/api/register', async (req, res) => {
    const prisma = new PrismaClient();

    console.log(req.body);

    const data = req.body;

    const name = data.name;
    const email = data.email;
    const password = data.password;
    const rePassword = data.rePassword;
    const phone = data.phone;

    if (!name || !email || !password || !rePassword || !phone) {
        return res.status(400).json({ error: 'Bad request' });
    }

    if (password != rePassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { phone },
                ],
            },
        });

        // If the user already exists, return an error
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return { error: 'User already exists' };
        };

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const auth = await prisma.user.create({
            data: {
                name: name.toString(),
                email: email.toString(),
                password: hashedPassword,
                phone: phone.toString(),
            },
        });

        // Return the user
        return res.status(200).json(auth);
    } catch (error) {
        Logger.error('Error during registration:');
        Logger.error(error);
        return res.status(500).json({ error: 'Failed to register' });
    } finally {
        await prisma.$disconnect();
    }
});

export default router;