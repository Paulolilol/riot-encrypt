import crypto from "crypto";

//keep sensitive information out of the codebase
//environment are not safe per se, but can combine with secret management tools
//assume out of scope here
const SECRET_KEY = process.env.SECRET_KEY;

export interface EncryptionAlgorithm {
  encrypt: (inputStr: string) => string;
  decrypt: (inputStr: string) => string;
}

export const base64EncryptionAlgorithm: EncryptionAlgorithm = {
  encrypt: (inputStr: string) => Buffer.from(inputStr).toString("base64"),
  decrypt: (inputStr: string) =>
    Buffer.from(inputStr, "base64").toString("utf-8"),
};

export const computeHmacSignature = (data: any): string => {
  if (SECRET_KEY === undefined) {
    throw new Error("secret key is undefined");
  }
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(JSON.stringify(data));
  return hmac.digest("hex");
};

export const isHmacSignatureValidForPayload = (
  signature: string,
  data: any,
): boolean => {
  return computeHmacSignature(data) === signature;
};
