interface SavedAccount {
  account_id: string;
  owner_name: string;
  account_number: number;
}

interface SavedAccountsProps {
  savedAccount: SavedAccount[] | null;
}

type AccountData = {
  account_id: string;
  account_number: string;
  balance: number;
  owner_name: string;
};

export type { SavedAccount, SavedAccountsProps, AccountData };
