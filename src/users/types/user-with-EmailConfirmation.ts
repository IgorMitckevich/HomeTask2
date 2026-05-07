

export type usersWithEmailConfirmation = {
    id: string;
    login: string;
    email: string;
    createdAt: string;
    emailConfirmation:{
        confirmationCode: string|null;
        expirationDate:Date|null;
        isConfirmed:boolean}

}