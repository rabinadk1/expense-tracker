import React, { createContext, useReducer } from "react";
import {
  State,
  TransactionInterface,
  TransactionsFetch,
  LocalTransaction,
} from "./types";
import AppReducer from "./AppReducer";

const URL = "/transactions";

// Initial state
const initialState: State = {
  transactions: [],
  loading: true,
  error: null,
};

// Create context
const GlobalContext = createContext(initialState);

// Provider Component
const GlobalProvider = ({ children }: { children: JSX.Element[] }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getTransactions = async () => {
    const response = await fetch(URL);
    const res: TransactionsFetch = await response.json();

    if (response.ok)
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data as TransactionInterface[],
      });
    else
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: res.error as string,
      });
  };

  const deleteTransaction = async (id: TransactionInterface["_id"]) => {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok)
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    else {
      const res = await response.json();
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: res.error as string,
      });
    }
  };
  const addTransaction = async (transaction: LocalTransaction) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    const res: TransactionsFetch = await response.json();

    if (response.ok)
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data as TransactionInterface,
      });
    else
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: res.error as string,
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
