import app from './app.js';
import { config } from './config/env.js';

app.listen(config.port, () => {
  console.log(`API berjalan di http://localhost:${config.port}`);
});
