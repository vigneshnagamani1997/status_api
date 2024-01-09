import crypto from 'crypto';

const SECRET = 'ANTONIO-REST-API';

export const encryptPassword = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');
