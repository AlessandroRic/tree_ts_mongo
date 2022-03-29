import { Router } from "express";
import { menuRoutes } from "./menus.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/user", userRoutes);

router.use("/menu", menuRoutes)

export { router };