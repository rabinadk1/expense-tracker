export interface LocalTransaction {
  text: string;
  amount: number;
}

export interface TransactionInterface extends LocalTransaction {
  _id: string; // Mongo ObjectID
  createdAt: Date;
  __v: number;
}

export interface State {
  transactions: TransactionInterface[];
  deleteTransaction?: (id: TransactionInterface["_id"]) => Promise<void>;
  addTransaction?: (transaction: LocalTransaction) => Promise<void>;
  getTransactions?: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Interface for response from server
export interface TransactionsFetch {
  success: boolean;
  count?: number;
  data?: TransactionInterface | TransactionInterface[];
  error?: string;
}
