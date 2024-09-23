import bcrypt from 'bcrypt'

const saltRounds = 10
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds)
}
export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}