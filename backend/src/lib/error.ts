export class AppError extends Error {
  constructor(message: string, public status: number, public data?: any) {
    super(message);
  }
}
