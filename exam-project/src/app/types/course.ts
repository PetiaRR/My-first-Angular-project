import { Post } from './post';
import { User } from './user';

export interface Course {
  posts: Post[];
  _id: string;
  courseName: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}