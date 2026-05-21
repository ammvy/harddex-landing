import { buildApp } from './app';
import { env } from './config/env';

const app = buildApp();

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
  console.log(`🚀 Server running at http://${env.HOST}:${env.PORT}`);
});
