export class AppHttpError extends Error {
  public status!: number;
  public errors!: Iterable<any>;

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends AppHttpError {
  constructor(message: string, errors: Iterable<any> = []) {
    super(message);
    this.name = "Bad Request";
    this.status = 400;
    this.errors = errors;
  }
}

export class UnauthorizedError extends AppHttpError {
  constructor(message: string, errors: Iterable<any> = []) {
    super(message);
    this.name = "Unauthorized";
    this.status = 401;
    this.errors = errors;
  }
}

export class NotFoundError extends AppHttpError {
  constructor(message: string, errors: Iterable<any> = []) {
    super(message);
    this.name = "Not Found";
    this.status = 404;
    this.errors = errors;
  }
}

export class ForbiddenError extends AppHttpError {
  constructor(message: string, errors: Iterable<any> = []) {
    super(message);
    this.name = "Forbidden";
    this.status = 403;
    this.errors = errors;
  }
}
