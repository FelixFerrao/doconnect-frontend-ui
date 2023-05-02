import { Injectable } from '@angular/core';
import { Question } from '../MyComponents/user/Model/question';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searched_questions: Question[] = [];

  constructor() { }

  store_searched_questions(questions: Question[]) {
    console.log(questions)
    questions.forEach((q) => {
      this.searched_questions.push(q);
    });
  }

  get_searched_questions() {
    return this.searched_questions;
  }
}
