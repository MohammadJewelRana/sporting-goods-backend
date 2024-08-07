import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  //   const { password, admin: adminData } = req.body;

  console.log(req.body);
  
  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const updateUser= catchAsync(async (req, res) => {
 const {id}=req.params;

  const result = await UserServices.updateUserIntoDB(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '  User updated successfully',
    data: result,
  });
});

const deleteUser= catchAsync(async (req, res) => {
  const {  id } = req.params;

  const result = await UserServices.deleteSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  // console.log('test',req.user);

  // console.log(req.cookies);

  const result = await UserServices.getAllUserFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All User data retrieved  successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' single user data is retrieved successfully',
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
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser
};
