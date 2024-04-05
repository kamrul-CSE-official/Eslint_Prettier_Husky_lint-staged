import User, { IUser } from "../models/user.model";

const signUpGeneralUser = async (data: IUser): Promise<IUser | null> => {
  try {
    const query = await User.create(data);
    return query;
  } catch (error: any) {
    throw new Error("Something went wrong, Signup fail, try again!");
  }
};

const authServices = {
  signUpGeneralUser,
};

export default authServices;
