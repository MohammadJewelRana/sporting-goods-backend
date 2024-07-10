/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser, TUserName } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { USER_ROLE, UserStatus } from './user.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const userSchema = new Schema<TUser>(
  {
    name: { type: userNameSchema, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },

    contactNo: { type: String, required: [true, 'Contact number is required'] },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },

    profileImg: { type: String },

    role: { type: String, enum: USER_ROLE },
    status: { type: String, enum: UserStatus, default: 'in-progress' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
