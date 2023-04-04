import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

interface User {
  email: string;
}

function generateToken(payload: User): string {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
}

function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, secret) as User;
    return decoded;
  } catch (err) {
    return null;
  }
}

export { generateToken, verifyToken };