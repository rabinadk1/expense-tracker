import React, { useContext } from "react";
import { TransactionInterface } from "../context/types";
import { GlobalContext } from "../context/GlobalState";

const Transaction: React.FC<TransactionInterface> = ({
  _id: id,
  text,
  amount,
}) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = amount < 0 ? "-" : "+";
  const className = amount < 0 ? "minus" : "plus";

  return (
    <li className={className}>
      {text}
      <span>
        {sign}${Math.abs(amount)}
      </span>
      <button
        className="delete-btn"
        onClick={() =>
          (deleteTransaction as (id: TransactionInterface["_id"]) => void)(id)
        }
      >
        X
      </button>
    </li>
  );
};

export default Transaction;
