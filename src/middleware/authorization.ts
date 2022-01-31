import { Request, Response, NextFunction } from 'express';

const authorization = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user
    if (role !== 'admin') {
        return res.status(403).send({ error: "Not authorize to perform this operation" });
    }

    return next();
};

export default authorization;