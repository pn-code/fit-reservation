import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../utils/jwt';


interface AuthRequest extends NextApiRequest {
  user?: {
    email: string;
  };
}

export const authenticateUser = (handler: (req: AuthRequest, res: NextApiResponse) => Promise<void>) => async (
  req: AuthRequest,
  res: NextApiResponse
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user;
  
  await handler(req, res);
};

export default authenticateUser;
