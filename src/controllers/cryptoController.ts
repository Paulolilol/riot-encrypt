import {
  EncryptionAlgorithm,
  base64EncryptionAlgorithm,
  computeHmacSignature,
  isHmacSignatureValidForPayload,
} from "@models/encryptionAlgorithms";
import { Request, Response } from "express";

interface JsonPayload {
  [key: string]: any;
}

// choose encryption algo here
const ENCRYPTION_ALGO = base64EncryptionAlgorithm;

const encryptPayload = (
  jsonPayload: JsonPayload,
  algo: EncryptionAlgorithm,
): object => {
  let encryptedPayload: JsonPayload = {};
  for (const key in jsonPayload) {
    let toEncrypt: string = JSON.stringify(jsonPayload[key]);
    //console.log(toEncrypt);
    encryptedPayload[key] = algo.encrypt(toEncrypt);
  }
  return encryptedPayload;
};

const decryptPayload = (
  jsonPayload: JsonPayload,
  algo: EncryptionAlgorithm,
): object => {
  let decryptedPayload: JsonPayload = {};
  for (const key in jsonPayload) {
    let decrypted = algo.decrypt(jsonPayload[key]);
    let jsonValue;
    try {
      jsonValue = JSON.parse(decrypted);
    } catch {
      jsonValue = decrypted;
    }
    decryptedPayload[key] = jsonValue;
  }
  return decryptedPayload;
};

const cryptoController = {
  encrypt: (req: Request<{}, {}, JsonPayload>, resp: Response) => {
    const jsonPayload = req.body;
    const encryptedPayload = encryptPayload(jsonPayload, ENCRYPTION_ALGO);
    resp.json(encryptedPayload);
  },
  decrypt: (req: Request<{}, {}, JsonPayload>, resp: Response) => {
    const jsonPayload = req.body;
    const decryptedPayload = decryptPayload(jsonPayload, ENCRYPTION_ALGO);
    resp.json(decryptedPayload);
  },
  sign: (req: Request<{}, {}, JsonPayload>, resp: Response) => {
    const jsonPayload = req.body;
    const signature = computeHmacSignature(jsonPayload);
    resp.json({ signature });
  },
  verify: (req: Request<{}, {}, JsonPayload>, resp: Response) => {
    const jsonPayload = req.body;
    const data = jsonPayload.data;
    const signature = jsonPayload.signature;
    const isValidSignature: boolean = isHmacSignatureValidForPayload(
      signature,
      data,
    );
    const statusCode = isValidSignature ? 204 : 400;
    const message = isValidSignature ? "OK" : "KO";
    resp
      .status(statusCode)
      .setHeader("Content-Type", "text/plain")
      .send(message);
  },
};

export default cryptoController;
