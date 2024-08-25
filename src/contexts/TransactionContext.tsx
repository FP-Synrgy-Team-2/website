import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { TransactionProps } from '@/types/transaction';
import { AccountData } from '@/types/accounts';

interface TransactionsContextProps {
  transactions: TransactionProps[] | null;
  setTransactions: Dispatch<SetStateAction<TransactionProps[] | null>>;
  accountData: AccountData | null;
  setAccountData: Dispatch<SetStateAction<AccountData | null>>;
  activeTransaction: TransactionProps | null;
  setActiveTransaction: Dispatch<SetStateAction<TransactionProps | null>>;
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const TransactionsContext = createContext<TransactionsContextProps | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider'
    );
  }
  return context;
};

export const TransactionsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(
    null
  );
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [activeTransaction, setActiveTransaction] =
    useState<TransactionProps | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date(0));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        accountData,
        setAccountData,
        activeTransaction,
        setActiveTransaction,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        setIsLoading,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
