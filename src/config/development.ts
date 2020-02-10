export const config = {
  common: {
    database: {
      database: process.env.DB_NAME_DEV
    },
    session: {
      secret: 'some-super-secret'
    }
  }
};
