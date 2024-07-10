import { Server } from 'http';
import app from './app';
import config from './config';
import mongoose from 'mongoose';
// import seedSuperAdmin from './DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // seedSuperAdmin();
    const port=config.port || 5001
    server = app.listen(config.port || 5001, () => {
      console.log(`This app listening on port  ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

// for Asynchronous code
process.on('unhandledRejection', (err) => {
  console.log(err);
  
  console.log('unhandledRejection is detected,shutting down...', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log(err);
  
  console.log('unhandledException is detected,shutting down...');
  process.exit(1);
});
