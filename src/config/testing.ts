export const config = {
  common: {
    database: {
      database: process.env.DB_NAME_TEST,
      logging: false
    },
    session: {
      secret: 'some-super-secret'
    }
  }
};
