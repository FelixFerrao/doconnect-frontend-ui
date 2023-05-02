import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from './Model/admin';
import { Question } from '../user/Model/question';
import { Answer } from '../user/Model/answer';
import { User } from '../login/Model/user';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  questionList: Question[] = [];
  answerList: Answer[] = [];
  userList: User[] = [];
  admin = new Admin();
  id_list = ['user', 'quest', 'ans'];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('admin') === null) this.router.navigate(['/']);

    this.admin = JSON.parse(localStorage.getItem('admin')!);

    this.adminService.getAllUsers().subscribe(
      (data) => {
        data.forEach((element) => {
          this.userList.push(element);
        });
      },
      (error) => {
        console.log('An error occurred while getting users data: ', error);
        this.router.navigate(['/']);
      }
    );

    this.adminService.getUnApprovedQuestions().subscribe(
      (data) => {
        console.log(`answer data received: ${data}`);
        console.log(data);
        data.forEach((element) => {
          this.questionList.push(element);
        });
      },
      (error) => {
        console.log('An error occurred while getting questions: ', error);
        this.router.navigate(['/']);
      }
    );

    this.adminService.getUnApprovedAnswers().subscribe(
      (data) => {
        data.forEach((element) => {
          this.answerList.push(element);
        });
      },
      (error) => {
        console.log('An error occurred while getting answer: ', error);
        this.router.navigate(['/']);
      }
    );
  }

  makeOthersInvisible(id: string) {
    let displayNoneIds = this.id_list.filter((value) => value !== id);
    displayNoneIds.forEach((value) => {
      let displayElement = document.getElementById(value);
      let displayElementClasses = displayElement?.classList;
      if (!displayElementClasses?.contains('display_none'))
        displayElement?.classList.toggle('display_none');
    });
  }

  displayUsers() {
    let userElement = document.getElementById('user');
    userElement?.classList.toggle('display_none');
    this.makeOthersInvisible('user');
  }
  displayQuestions() {
    let questElement = document.getElementById('quest');
    questElement?.classList.toggle('display_none');
    this.makeOthersInvisible('quest');
  }
  displayAnswers() {
    let ansElement = document.getElementById('ans');
    ansElement?.classList.toggle('display_none');
    this.makeOthersInvisible('ans');
  }

  approveQuestion(question_id: number) {
    this.adminService.approveQuestion(question_id).subscribe(
      (data) => {
        let updatedQuestionList = this.questionList.filter(
          (ques) => ques.id !== question_id
        );
        this.questionList = updatedQuestionList;
      },
      (error) => {
        console.log('An error occurred while approving question', error);
      }
    );
  }

  approveAnswer(answer_id: number) {
    this.adminService.approveAnswer(answer_id).subscribe(
      (data) => {
        let updatedAnswerList = this.answerList.filter(
          (ans) => ans.id !== answer_id
        );
        this.answerList = updatedAnswerList;
      },
      (error) => {
        console.log('An error occurred while approving answer', error);
      }
    );
  }
}
