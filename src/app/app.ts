// import express, { Application } from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import router from './routes';
// import globalErrorHandler from './errors/globalErrorHandler';
// import notFound from './errors/notFound';

// const app: Application = express();


// // CORS configuration
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'], // Make sure to include headers if needed
// };

// //parser
// app.use(express.json());
// // app.use(cors());
// // app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
// app.use(cors(corsOptions));
// app.use(express.text());
// app.use(cookieParser());


// app.use('/api', router); //get routes from router folder

// // app.get('/', (req: Request, res: Response) => {
// //     res.json({
// //       message: ' This app is running into the server!!!',
// //     });
// //   });


// app.options('*', cors(corsOptions));
//   //global error handling
// app.use(globalErrorHandler); //error handling
// app.use(notFound); //not found route
  
// export default app;








import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import globalErrorHandler from './errors/globalErrorHandler';
import notFound from './errors/notFound';

const app: Application = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS before any routes or middleware

// Handle OPTIONS requests for CORS preflight
app.options('*', cors(corsOptions));

// Parsers
app.use(express.json());
app.use(express.text());
app.use(cookieParser());

// Routes
app.use('/api', router);

// Global error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
