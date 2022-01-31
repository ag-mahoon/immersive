import * as jwt from 'jsonwebtoken';
import { IUser } from './user';

const createToken = (user: Partial<IUser>) => {
    const token = jwt.sign(
        {
            user_id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h"
        }
    );
    return token;
}

export default createToken;