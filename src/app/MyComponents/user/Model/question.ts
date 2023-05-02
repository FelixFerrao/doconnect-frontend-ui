import { User } from '../../login/Model/user';
import { Answer } from './answer';

export class Question {
  id: number;
  question: string;
  topic: string;
  isApproved: boolean;
  user: User;
  answer: Answer[];
}
