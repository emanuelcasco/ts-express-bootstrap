/**
 * This type definition augments existing definition
 * from @types/express
 */
declare namespace Express {
  interface Request {
    user?: import('../db/entities/User').User;
  }
  interface Response {
    user?: import('../db/entities/User').User;
  }
}
