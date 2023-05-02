import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { giveAnswerDTO } from '../dto/giveAnswerDTO';
import { User } from '../login/Model/user';
import { Question } from '../user/Model/question';
import { UserService } from 'src/app/Service/users.service';
import { GetAnswerDetailsDTO } from '../dto/get_answer_details_dto';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {
  user = new User();
  answer_list: GetAnswerDetailsDTO[] = [];
  question = new Question();

  constructor(
    private userService: UserService,
    private router: Router,
    private activated_router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') === null) this.router.navigate(['/login']);
    this.user = JSON.parse(localStorage.getItem('user')!);

    if (!this.activated_router.snapshot.paramMap.get('question_id'))
      this.router.navigate(['/user']);

    const questionId =
      this.activated_router.snapshot.paramMap.get('question_id') !== null
        ? this.activated_router.snapshot.paramMap.get('question_id')
        : '';

    this.userService
      .getQuestionById(Number.parseInt(questionId ? questionId : ''))
      .subscribe(
        (data) => {
          this.question = data;
        },
        (error) => {
          console.log(
            'An error occurred while fetching question data: ',
            error
          );
          this.router.navigate(['/user']);
        }
      );

    this.userService
      .getAnswers(Number.parseInt(questionId ? questionId : ''))
      .subscribe(
        (data) => {
          data.forEach((answer_element) => {
            let answer = new GetAnswerDetailsDTO();
            answer.answer_id = answer_element.answer_id;
            answer.answer = answer_element.answer;
            answer.approved = answer_element.approved;
            answer.user_id = answer_element.user_id;
            answer.username = answer_element.username;
            answer.question_id = answer_element.question_id;

            this.answer_list.push(answer);
          });
          // console.log(this.answer_list)
        },
        (error) => {
          console.log(`An error occurred while getting answer: ${error}`);
          alert('Error occurred');
          this.router.navigate(['/user']);
        }
      );
    if (!this.question) {
      this.router.navigate(['/user']);
    }
  }

  addAnswer(data: any) {
    let answerDTO = new giveAnswerDTO();
    console.log(data);
    answerDTO.answer = data.user_answer;
    answerDTO.question_id = this.question.id;
    answerDTO.user_id = this.user.id;

    this.userService.giveAnswer(answerDTO).subscribe(
      (data) => {
        alert('Answer posted successfully');
        this.router.navigate(['/user']);
      },
      (err) => {
        console.log('An error occured: ', err);
        alert('Sorry! Could not post answer');
      }
    );
  }
}
