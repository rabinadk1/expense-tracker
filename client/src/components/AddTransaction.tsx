import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { LocalTransaction } from "../context/types";

const AddTransaction: React.FC = () => {
  const [text, setText] = useState("");

  // Setting it to string to be able to type -100 sequentially
  const [amount, setAmount] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Prevent Page from Reloading
    e.preventDefault();

    const parsed = parseFloat(amount);
    if (isNaN(parsed)) return;

    const transaction: LocalTransaction = {
      text,
      amount: parsed,
    };

    (addTransaction as (l: LocalTransaction) => void)(transaction);

    // Clear the fields
    setText("");
    setAmount("");
  };

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount
            <br /> (negative-expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
