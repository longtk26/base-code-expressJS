import { Response } from "express";
import {
  CREATEDResponseTypes,
  OKResponseTypes,
  SuccessResponseTypes,
} from "../types/core";
import httpStatusCode from "../utils/httpStatusCode";

const { StatusCode, ReasonPhrases } = httpStatusCode;

class SuccessResponse {
  private message: string;
  private statusCode: number;
  private metadata: any;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }: SuccessResponseTypes) {
    this.message = message ? message : reasonStatusCode;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: OKResponseTypes) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  options: any;

  constructor({
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata = {},
    options = {},
  }: CREATEDResponseTypes) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

export { OK, SuccessResponse, CREATED };
