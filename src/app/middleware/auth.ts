import jwt, { JwtPayload } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { User } from '../modules/user/user.model';
 
 

const auth = (...requiredRoles : string[]) => {

  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization);

    //token comes or not from frontend
    const token = req.headers.authorization; //get from header
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are unauthorized user!!',
      );
    }

    // console.log(requiredRoles);
 

    //verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    //get data from token decoded
    const { role, userId, iat } = decoded;

    //validations
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
    }
    if (user?.isDeleted === true) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
    }

    //authorization check from route
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route!!',
      );
    }
    req.user = decoded as JwtPayload;
    next(); //go to next middleware
  });
};

export default auth;
