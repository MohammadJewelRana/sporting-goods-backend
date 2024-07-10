import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  //   const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});



// const changeStatus = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await UserServices.changeStatus(id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Status is updated successfully',
//     data: result,
//   });
// });

export const UserControllers = {
  createAdmin,
};
