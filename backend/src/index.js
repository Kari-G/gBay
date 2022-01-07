import app from './app';
import config from './config';

const PORT = config.port || 8080;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
