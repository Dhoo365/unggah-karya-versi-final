import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  corsOrigin: (process.env.CORS_ORIGIN || '').split(',').filter(Boolean),
};
