export type UsersCollectionDB = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
  password: string;
  emailConfirmation: {
    confirmationCode: string | null;
    expirationDate: Date | null;
    isConfirmed: boolean;
  };
  recovery:{
    recoveryCode: string|null;
    expirationDate: Date | null;
  };
};
