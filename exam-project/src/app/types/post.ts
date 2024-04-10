//import { Theme } from './theme';
import { User } from './user';
import { Course } from './course';

export interface Post {
  likes: string[];
  _id: string;
  text: string;
  userId: User;
  courseId: Course;
  created_at: string;
  updatedAt: string;
  __v: number;
}