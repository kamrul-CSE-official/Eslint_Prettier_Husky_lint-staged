import express, { Request, Response, Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import authControllers from "../controllers/auth.controllers";

const router: Router = express.Router();
type Route = Record<string, any>;

const mapRoutesToController = (routes: Route[]) => {
  routes.forEach(({ method, path, controller }) => {
    switch (method) {
      case "GET":
        router.get(path, asyncHandler(controller));
        break;
      case "POST":
        router.post(path, asyncHandler(controller));
        break;
      default:
        router.all(path, (req: Request, res: Response) => {
          res.status(405).json({
            error: `HTTP method ${req.method} is not allowed for ${path}`,
          });
        });
    }
  });
};

// Define routes
const routes: Route[] = [
  {
    method: "POST",
    path: "/general/signup",
    controller: authControllers.signUpGeneralUser,
  },
];

mapRoutesToController(routes);

export default router;
