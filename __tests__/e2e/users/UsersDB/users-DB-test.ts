import { UserViewModelWithPassword } from "../../../../src/users/types/UserViewModelWithPassword";

export const users: UserViewModelWithPassword[] = [
  {
    id: "507f1f77bcf86cd799439011",
    login: "alex_walker",
    email: "alex.walker@example.com",
    createdAt: "2024-01-15T10:30:00.000Z",
    password: "password123",
  },
  {
    id: "507f1f77bcf86cd799439012",
    login: "jane_doe",
    email: "jane.doe@example.com",
    createdAt: "2024-02-20T14:45:00.000Z",
    password: "qwerty789",
  },
  {
    id: "507f1f77bcf86cd799439013",
    login: "john_smith",
    email: "john.smith@example.com",
    createdAt: "2024-03-10T08:15:00.000Z",
    password: "admin456",
  },
  {
    id: "507f1f77bcf86cd799439014",
    login: "emily_brown",
    email: "emily.brown@example.com",
    createdAt: "2024-04-05T16:20:00.000Z",
    password: "secret321",
  },
  {
    id: "507f1f77bcf86cd799439015",
    login: "mike_wilson",
    email: "mike.wilson@example.com",
    createdAt: "2024-05-12T11:00:00.000Z",
    password: "pass987",
  },
];

export const usersWithHashPassword: UserViewModelWithPassword[] = [
  {
    id: "507f1f77bcf86cd799439011",
    login: "alex_walker",
    email: "alex.walker@example.com",
    createdAt: "2024-01-15T10:30:00.000Z",
    password: "$2a$10$BIwi2qVrVJbEhLCwa.ByV.Ex51gEFP0CEcka7VGSWWGH0UEoFa586",
  },
  {
    id: "507f1f77bcf86cd799439012",
    login: "jane_doe",
    email: "jane.doe@example.com",
    createdAt: "2024-02-20T14:45:00.000Z",
    password: "$2a$10$L1w6.UcBDAc32tJABwX6MO7KZX.Zn3ByeQZf./2SImjuEk28ORYiu",
  },
  {
    id: "507f1f77bcf86cd799439013",
    login: "john_smith",
    email: "john.smith@example.com",
    createdAt: "2024-03-10T08:15:00.000Z",
    password: "$2a$10$tfwMO3BfG9XKbgpKUdeR1ucPE/WL3/2PBUkryZGLJXheqr148LsPu",
  },
  {
    id: "507f1f77bcf86cd799439014",
    login: "emily_brown",
    email: "emily.brown@example.com",
    createdAt: "2024-04-05T16:20:00.000Z",
    password: "$2a$10$vJYmGL1AvusmFH4UD5QaUusegTk11x1WRFMrN63LmAm8rToGTPkNm",
  },
  {
    id: "507f1f77bcf86cd799439015",
    login: "mike_wilson",
    email: "mike.wilson@example.com",
    createdAt: "2024-05-12T11:00:00.000Z",
    password: "$2a$10$JcxHvKVhdW7H.afyFsGJLO.mNXj3Uxu0tfWTC.j78PtPAb3DVqwAK",
  },
];
