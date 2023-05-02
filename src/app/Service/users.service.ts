import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/MyComponents/login/Model/user';
import { Answer } from 'src/app/MyComponents/user/Model/answer';
import { Question } from 'src/app/MyComponents/user/Model/question';
import { GetAnswerDetailsDTO } from '../MyComponents/dto/get_answer_details_dto';
import { UserLoginDTO } from '../MyComponents/dto/UserLoginDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  questionId: number = 0;
  user = new User();

  send_user_data(user: User) {
    this.user = user;
  }

  provide_user_data(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  url = 'http://localhost:9090/user';

  getQuestionId(questionId: number) {
    this.questionId = questionId;
  }
  sendQuestionId() {
    return this.questionId;
  }

  userLogin(login_dto: UserLoginDTO): Observable<User> {
    return this.http.post<User>(this.url + '/login', login_dto);
  }

  userLogout(userId: number) {
    return this.http.get(this.url + '/logout/' + userId);
  }

  userRegister(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/register', user);
  }

  askQuestion(askQuestionDTO: any): Observable<Question> {
    return this.http.post<Question>(this.url + '/askQuestion', askQuestionDTO);
  }

  giveAnswer(postAnswerDTO: any): Observable<Answer> {
    return this.http.post<Answer>(this.url + '/giveAnswer', postAnswerDTO);
  }

  searchQuestion(question: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.url + '/searchQuestion/' + question);
  }

  getAnswers(questionId: number): Observable<GetAnswerDetailsDTO[]> {
    return this.http.get<GetAnswerDetailsDTO[]>(
      this.url + '/getAnswerDetails/' + questionId
    );
  }

  getQuestions(topic: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.url + '/getQuestions/' + topic);
  }

  getQuestionById(question_id: number): Observable<Question> {
    return this.http.get<Question>(
      this.url + '/getQuestionById/' + question_id
    );
  }
}
