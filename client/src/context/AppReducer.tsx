import { State, TransactionInterface } from "./types";

// Defining union explicitly
type Action =
  | {
      type: "DELETE_TRANSACTION";
      payload: TransactionInterface["_id"];
    }
  | {
      type: "ADD_TRANSACTION";
      payload: TransactionInterface;
    }
  | {
      type: "GET_TRANSACTIONS";
      payload: TransactionInterface[];
    }
  | {
      type: "TRANSACTION_ERROR";
      payload: string;
    };

const Reducer: (state: State, action: Action) => State = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          ({ _id: id }) => id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
