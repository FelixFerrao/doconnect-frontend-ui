import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { giveAnswerDTO } from '../dto/giveAnswerDTO';
import { User } from '../login/Model/user';
import { Question } from './Model/question';
import { AskQuestionDTO } from './Model/ask_question_dto';
import { UserService } from 'src/app/Service/users.service';
import { SearchService } from 'src/app/Service/search.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() searched_questions: Question[];
  question_details = new Question();
  user = new User();

  transfer_question_details(question: Question) {
    this.question_details = question;
  }
  questionList: Question[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private search_service: SearchService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/login']);
    }

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    if (this.search_service.get_searched_questions().length > 0) {
      this.questionList = this.search_service.get_searched_questions();
    } else {
      this.userService.getQuestions('all').subscribe(
        (data) => {
          data.forEach((q) => {
            if (q === null) this.questionList = [];
            else this.questionList.push(q);
          });
        },
        (err) => {
          console.log('an error occured while returning questions: ' + err);
        }
      );
    }
  }

  addAnswer(data: any) {
    let answerDTO = new giveAnswerDTO();
    answerDTO.user_id = this.user.id;
    answerDTO.question_id = this.question_details.id;
    answerDTO.answer = data.answer;

    this.userService.giveAnswer(answerDTO).subscribe(
      (data) => {
        alert('Answer posted successfully');
      },
      (err) => {
        console.log('An error occured: ', err);
        alert('Sorry! Could not place answer');
      }
    );
  }

  getQuestionList() {
    return this.questionList;
  }

  selected: any = [];
  onChange(name: string, isChecked: boolean) {
    if (isChecked) {
      this.selected.push(name);
    } else {
      this.selected.pop();
    }
  }

  question: Question | undefined;
  askQuestion(data: any) {
    let askQuestion = new AskQuestionDTO();

    askQuestion.user_question = data.question;
    askQuestion.user_id = this.user.id;
    askQuestion.topic = data.topic;

    this.userService.askQuestion(askQuestion).subscribe(
      (data) => {
        this.question = data;
        alert('Question Posted ');
        document.getElementById('close-btn')?.click();
        // this.router.navigate(['/user']);
      },
      (err) => {
        console.log('an error occured: ' + err);
      }
    );
  }

  get_question_by_topic(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value;
      this.questionList = [];
      this.userService.getQuestions(selectedValue).subscribe(
        (data) => {
          data.forEach((q) => {
            if (q === null) this.questionList = [];
            else this.questionList.push(q);
          });
        },
        (err) => {
          console.log('an error occured while returning questions: ' + err);
        }
      );
    }
  }
}
