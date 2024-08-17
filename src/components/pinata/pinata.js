import { PinataSDK } from "pinata";
// require("dotenv").config();

const jwt = process.env.REACT_APP_PINATA_JWT;
const gateway = process.env.REACT_APP_GATEWAY_URL;
const pinata = new PinataSDK({
  pinataJwt: jwt,
  pinataGateway: gateway,
});

export { pinata };
