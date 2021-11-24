// A JSON Web Key (JWK) is a JSON data structure that represents a set of public keys.

import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import {domain} from "../config/env.dev";

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});

export default checkJwt;
