import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

interface Payload {
  email: string;
}

function generateToken(payload: Payload): string {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
}

function verifyToken(token: string): Payload | null {
  try {
    const decoded = jwt.verify(token, secret) as Payload;
    return decoded;
  } catch (err) {
    return null;
  }
}

export { generateToken, verifyToken };