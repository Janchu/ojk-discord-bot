import pino from "pino";

require("dotenv").config();

const developmentTransportOptions = {
  target: "pino-pretty",
  options: { destination: 1 },
};

const productionTransportOptions = {
  target: "pino/file",
  options: { destination: "./logs.log" },
};

const logger =
  process.env.NODE_ENV === "development"
    ? pino(pino.transport(developmentTransportOptions))
    : pino(pino.transport(productionTransportOptions));

export default logger;
