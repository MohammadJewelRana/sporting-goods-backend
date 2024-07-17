import jwt, { JwtPayload } from 'jsonwebtoken';
/* eslint-disable no-undef */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
 
 
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';



//user login
const loginUserFromDB = async (payload: Partial<TUser>) => {
  // console.log(payload);

  const user = await User.findOne({ email: payload?.email });
  // console.log(user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  if (user?.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //check password is correct
  const { password } = payload;
  const isPasswordMatched = await bcrypt.compare(
    password as string,
    user?.password,
  );
  // console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, '    password does not match  ');
  }

  //create token and sent to client
  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role as unknown as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

//create refresh token
const refreshToken = async (token: string) => {
  //verify token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  //get data from token decoded
  const { userId } = decoded;

  //validations
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  if (user?.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //create token and sent to client
  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role as unknown as string,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {

  loginUserFromDB,
  refreshToken,
};
