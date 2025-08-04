import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.AccessTokenSecretKey)

const hashPassword = async (password: string) => {
  const hashedPassword = await new SignJWT({ password })
  .setProtectedHeader({ alg: 'HS256' })
  .sign(secretKey);

return hashedPassword;
};

const verifyPassword = async (password: string, hashedPassword: string) => {

  const { payload } = await jwtVerify(hashedPassword, secretKey);
  return payload.password === password;
};

const generateAccessToken = async (data: any) => {
  const secret = new TextEncoder().encode(process.env.AccessTokenSecretKey);

  const token = await new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  return token;
};

const verifyAccessToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.AccessTokenSecretKey);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error("Verify access token error: ", error);
    return false;
  }
};

const generateRefreshToken = async (data: any) => {
  const secret = new TextEncoder().encode(process.env.RefreshTokenSecretKey);

  const token = await new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("15d")
    .sign(secret);

  return token;
};

const validateUsername = (username: string | null) => {
  const pattern = /^[A-Za-z0-9_-]{3,15}$/g;
  return pattern.test(username!);
};

const validatePassword = (password: string | null) => {
  const pattern = /^[A-Za-z0-9*\\-_\/\+\.]{6,24}$/g;
  return pattern.test(password!);
};

const authMiddleware = async (req: Request) => {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) {
    return false;
  } else {
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key, value];
      })
    );
    const token = cookies["token"];
    const isValid = await verifyAccessToken(token);
    if (isValid) {
      return true;
    } else {
      false;
    }
  }
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  validateUsername,
  validatePassword,
  authMiddleware,
};
