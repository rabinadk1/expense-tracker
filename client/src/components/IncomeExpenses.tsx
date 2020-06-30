import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const IncomeExpenses: React.FC = () => {
  const { transactions } = useContext(GlobalContext);

  let income = 0,
    expense = 0;
  transactions.forEach(({ amount }) => {
    if (amount > 0) income += amount;
    // Subtracting since the amount is negative
    else expense -= amount;
  });

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
