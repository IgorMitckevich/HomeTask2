import { CommentViewModel } from "../../../src/comment/types/CommentViewModel";
import { CommentsDB } from "../../../src/comment/types/typeCommentsDB";

export const comments: CommentsDB[] = [
  {
    id: "607f1f77bcf86cd799439101",
    content:
      "Great article! Very informative and well-written. Looking forward to more content like this.",
    commentatorInfo: {
      userId: "507f1f77bcf86cd799439011",
      userLogin: "alex_walker",
    },
    createdAt: "2024-06-15T10:30:00.000Z",
    postId: "507f1f77bcf86cd799439201",
  },
  {
    id: "607f1f77bcf86cd799439102",
    content:
      "I have a question about the implementation details. Could you provide more examples?",
    commentatorInfo: {
      userId: "507f1f77bcf86cd799439012",
      userLogin: "jane_doe",
    },
    createdAt: "2024-06-16T14:20:00.000Z",
    postId: "507f1f77bcf86cd799439202",
  },
  {
    id: "607f1f77bcf86cd799439103",
    content: "This helped me solve my problem. Thanks for sharing!",
    commentatorInfo: {
      userId: "507f1f77bcf86cd799439013",
      userLogin: "john_smith",
    },
    createdAt: "2024-06-17T09:15:00.000Z",
    postId: "507f1f77bcf86cd799439203",
  },
  {
    id: "607f1f77bcf86cd799439104",
    content: "I disagree with some points here. The approach seems outdated.",
    commentatorInfo: {
      userId: "507f1f77bcf86cd799439014",
      userLogin: "emily_brown",
    },
    createdAt: "2024-06-18T16:45:00.000Z",
    postId: "507f1f77bcf86cd799439204",
  },
  {
    id: "607f1f77bcf86cd799439105",
    content: "Excellent explanation! Clear and concise. Keep up the good work!",
    commentatorInfo: {
      userId: "507f1f77bcf86cd799439015",
      userLogin: "mike_wilson",
    },
    createdAt: "2024-06-19T11:00:00.000Z",
    postId: "507f1f77bcf86cd799439205",
  },
  {
    id: "607f1f77bcf86cd799439106",
    content:
      "Could you elaborate more on the security aspects? That would be very helpful.",
    commentatorInfo: {
      userId: "507f1f77bcf86cd799439011",
      userLogin: "alex_walker",
    },
    createdAt: "2024-06-20T08:30:00.000Z",
    postId: "507f1f77bcf86cd799439207",
  },
];
