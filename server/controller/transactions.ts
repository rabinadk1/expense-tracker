import Transaction from "../models/Transaction";
import { RequestHandler } from "express";

/*
@desc Get all transactions
@route GET /transactions
@access Public
*/

export const getTransactions: RequestHandler = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/*
@desc Add transactions
@route POST /transactions
@access Public
*/
export const addTransactions: RequestHandler = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") res.status(400);
    else res.status(500);
    return res.json({
      success: false,
      error: err.message,
    });
  }
};

/*
@desc Delete transactions
@route DELETE /transactions/:id
@access Public
*/
export const deleteTransaction: RequestHandler = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndRemove(req.params.id);
    if (transaction)
      return res.json({
        success: true,
        data: transaction,
      });

    return res.status(404).json({
      success: false,
      error: "ID not found",
    });
  } catch (err) {
    // Unable to cast id to ObjectId
    if (err.name === "CastError") res.status(400);
    else res.status(500);

    return res.json({
      success: false,
      error: err.message,
    });
  }
};
