import jwt from 'jsonwebtoken';

export function createJWT(payload: any, options?: jwt.SignOptions) {
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function verifyJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
