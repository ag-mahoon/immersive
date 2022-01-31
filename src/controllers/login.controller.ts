import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createToken from '../utils/createToken';
import dummyUser, { IUser } from '../utils/user';

type IUserAndToken = IUser & {
  token: string;
};

export const login = (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        if (email === dummyUser.email && password === dummyUser.password) {
            const token = createToken(dummyUser);
            const dummyNewUser = dummyUser as IUserAndToken;
            dummyNewUser.token = token;

            return res.status(200).json(dummyUser);
        }

        return res.status(400).send({ error: "Invalid Credentials" });
    } catch (err) {
        return res.status(500).send({ error: "An unexpected error occurred" });
    }
};