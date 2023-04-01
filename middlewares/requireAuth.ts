import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../utils/jwt';

interface Payload {
  email: string;
}

interface AuthRequest extends NextApiRequest {
  user?: Payload;
}

function requireAuth(handler: (req: AuthRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: AuthRequest, res: NextApiResponse) => {
    const token = req.cookies['jwt'];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const payload = verifyToken(token) as Payload;

    if (!payload) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.user = payload;

    return handler(req, res);
  };
}

export default requireAuth;
