import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status';
import { PractiseModuleServices } from './practiseModule.service';

const getAll = catchAsync(async (req, res) => {
  const result = await PractiseModuleServices.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Practice Api Success',
    data: result,
  });
});

export const PractiseControllers = {
  getAll,
};
