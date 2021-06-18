import { compare } from 'bcrypt';

/**
 * 
 * @param password 
 * @param validPassword 
 * @returns 
 */
export const validate = async (password: string, validPassword: string) => {
  return await compare(validPassword, password);
};