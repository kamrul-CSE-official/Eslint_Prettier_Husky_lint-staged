"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("src/models/user.model"));
const signUpGeneralUser = async (data) => {
  try {
    const query = await user_model_1.default.create(data);
    return query;
  } catch (error) {
    throw new Error("Something went wrong, Signup fail, try again!");
  }
};
const authServices = {
  signUpGeneralUser,
};
exports.default = authServices;
