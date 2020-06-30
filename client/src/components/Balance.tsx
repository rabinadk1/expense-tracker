import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Balance: React.FC = () => {
  const { transactions } = useContext(GlobalContext);

  const total = transactions.reduce((tot, { amount }) => tot + amount, 0);

  const sign = total < 0 ? "-" : "+";
  return (
    <>
      <h4>Your Balance</h4>
      <h1>
        {sign}${Math.abs(total)}
      </h1>
    </>
  );
};

export default Balance;
