import { jwtVerify, SignJWT } from 'jose'

export const getJWTSecretKey = () => {
  const secret = process.env.JWT_SECRET

  if (!secret || secret.length === 0) {
    throw new Error('JWT_SECRET is not defined')
  }

  return secret
}

export const verifyAuth = async (token) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJWTSecretKey()))

    return verified.payload
  } catch (err) {
    throw new Error('Invalid token')
  }
}