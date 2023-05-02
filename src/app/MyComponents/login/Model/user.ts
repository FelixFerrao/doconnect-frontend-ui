export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  active: boolean;
  questionList: Array<string>[];
  answerList: Array<string>[];
}
