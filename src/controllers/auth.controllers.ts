import { Request, Response } from "express";
import authServices from "../services/auth.services";

const signUpGeneralUser = async (req: Request, res: Response) => {
  try {
    const { body: newData } = req;
    const query = await authServices.signUpGeneralUser(newData);
    res.status(200).json({
      status: 200,
      message: "Account created successfully",
      data: query,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ status: 500, message: errorMessage });
  }
};

const authControllers = {
  signUpGeneralUser,
};

export default authControllers;
