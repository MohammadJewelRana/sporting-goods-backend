

import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';

import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';




const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserFromDB(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: { accessToken, refreshToken },
    // data: null,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'access token retrieved successfully',
    data: result,
  });
});

export const AuthController = {
  
  loginUser,
  refreshToken,
};
