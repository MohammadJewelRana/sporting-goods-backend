import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';

import { User } from './user.model';
import QueryBuilder from '../../builders/QueryBuilder';

const createAdminIntoDB = async (payload: TUser) => {
  console.log(payload);

  const result = await User.create(payload);
  return result;
};

const updateUserIntoDB = async (userId: string, payload: Partial<TUser>) => {
  const { name, ...remainingUserData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingUserData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: modifiedData,
    },
    {
      new: true,
    },
  );

  return result;
};

const deleteSingleUser = async (userId: string) => {
  const result = await User.findByIdAndDelete({ _id: userId });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
  }

  return result;
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    // .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ _id: userId });

  return result;
};

export const UserServices = {
  createAdminIntoDB,
  updateUserIntoDB,
  deleteSingleUser,
  getAllUserFromDB,
  getSingleUserFromDB,
};
