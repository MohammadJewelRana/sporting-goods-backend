export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGender = 'male' | 'female' | 'other';

export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;

  gender: TGender;
  dateOfBirth?: string;

  contactNo: string;

  bloodGroup?: TBloodGroup;
  presentAddress?: string;

  profileImg?: string;

  role: 'admin' | 'customer';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
