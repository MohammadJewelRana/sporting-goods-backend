import express from 'express';
import { PractiseControllers } from './practiseModule.controller';
 

 

const router = express.Router();

 
router.get('/',PractiseControllers.getAll );

 

export const PracticeRoute = router;
