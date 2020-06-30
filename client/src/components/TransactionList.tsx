import React, { useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { GlobalContext } from "../context/GlobalState";

import Transaction from "./Transaction";

const TransactionList: React.FC = () => {
  const { transactions, getTransactions, loading } = useContext(GlobalContext);

  useEffect(() => {
    (getTransactions as () => Promise<void>)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <h2 style={{ textAlign: "center" }}>Loading...</h2>
          <br />
          <ReactLoading className="money" type="bars" color="grey" />
        </div>
      ) : (
        <>
          {transactions.length === 0 ? (
            <h3>No Transactions Till Now</h3>
          ) : (
            <>
              <h3>History</h3>
              <ul className="list" id="list">
                {transactions.map((transaction) => (
                  <Transaction key={transaction._id} {...transaction} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TransactionList;
