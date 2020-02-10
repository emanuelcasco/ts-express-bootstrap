import bcrypt from 'bcryptjs';

export const SALT_ROUND = 10;

export async function encrypt(data: string): Promise<string> {
  const crypted = await bcrypt.hash(data, SALT_ROUND);
  return crypted;
}

export async function compare(data: string, original: string): Promise<boolean> {
  const isValid = await bcrypt.compare(data, original);
  return isValid;
}
