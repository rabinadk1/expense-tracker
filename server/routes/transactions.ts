import { Router } from "express";
import {
  getTransactions,
  addTransactions,
  deleteTransaction,
} from "../controller/transactions";

const router = Router();

router.route("/").get(getTransactions).post(addTransactions);

router.route("/:id").delete(deleteTransaction);

export default router;
