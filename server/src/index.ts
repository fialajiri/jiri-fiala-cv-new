import app from './server';
import { config } from 'dotenv';

config();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3000');
});
