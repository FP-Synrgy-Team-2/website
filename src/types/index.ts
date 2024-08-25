import { JwtPayload } from 'jwt-decode';

interface SavedAccount {
  savedAccountId: string;
  ownerName: string;
  accountNumber: string;
}

interface Session {
  accessToken: string;
  userId: string;
  accountNumber: string;
}

interface BankAccount {
  balance: number;
  accountId: string;
  ownerName: string;
  accountNumber: string;
}

interface User {
  userId: string;
  username: string;
  emailAddress: string;
  fullname: string;
  phoneNumber: string;
}

interface CustomJWTPayload extends JwtPayload {
  user_id: string;
  username: string;
}

export type { SavedAccount, BankAccount, User, Session, CustomJWTPayload };
