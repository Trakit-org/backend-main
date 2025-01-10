import crypto from "crypto";

const generateRandomString = () => {
  return crypto.randomBytes(16).toString('hex');
};

export default generateRandomString;
