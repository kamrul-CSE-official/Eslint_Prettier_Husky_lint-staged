"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = __importDefault(require("../services/auth.services"));
const signUpGeneralUser = async (req, res) => {
  try {
    const { body: newData } = req;
    const query = await auth_services_1.default.signUpGeneralUser(newData);
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
exports.default = authControllers;
