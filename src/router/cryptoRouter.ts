import express, { Request, Response } from "express";
import cryptoController from "@controllers/cryptoController";
const cryptoRouter = express.Router();
const ENCRYPT_ENDPOINT = "/encrypt";
const DECRYPT_ENDPOINT = "/decrypt";
const VERIFY_ENDPOINT = "/verify";
const SIGN_ENDPOINT = "/sign";
const HEALTHCHECK = "/healthcheck";

cryptoRouter.get(HEALTHCHECK, (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain").status(200).send("ok");
});

cryptoRouter.get(ENCRYPT_ENDPOINT, (req: Request, res: Response) => {
  cryptoController.encrypt(req, res);
});

cryptoRouter.get(DECRYPT_ENDPOINT, (req: Request, res: Response) => {
  cryptoController.decrypt(req, res);
});

cryptoRouter.get(SIGN_ENDPOINT, (req: Request, res: Response) => {
  cryptoController.sign(req, res);
});

cryptoRouter.get(VERIFY_ENDPOINT, (req: Request, res: Response) => {
  cryptoController.verify(req, res);
});

export default cryptoRouter;
