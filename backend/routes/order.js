import express  from "express";
const router = express.Router();

import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { allOrders, deleteOrder, getOrderDetails, myOrders, newOrder, updateOrder } from "../controllers/orderControllers.js";
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/order").get(isAuthenticatedUser, myOrders);
router.route("/admin/order").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default router;