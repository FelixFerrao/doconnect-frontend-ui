import { User } from '../../login/Model/user';
import { Question } from './question';

export class Answer {
  id: number;
  answer: string;
  approved: boolean;
  question: Question;
  user: User;
}
