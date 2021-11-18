import dotenv from "dotenv";
dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
const serverPort = process.env.SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;

if (!audience || !domain || !serverPort || !clientOriginUrl) {
  throw new Error(
    ".env is missing the definition of an environmental variable"
  );
}

const clientOrigins = [clientOriginUrl];

export {
  audience,
  domain,
  serverPort,
  clientOriginUrl,
  clientOrigins,
};
