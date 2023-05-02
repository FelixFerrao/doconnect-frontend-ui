import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin/Model/admin';
import { User } from '../login/Model/user';
import { Question } from '../user/Model/question';
import { UserService } from 'src/app/Service/users.service';
import { SearchService } from 'src/app/Service/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: User | null = null;
  admin: Admin | null = null;
  // searched_questions: Question[];
  @Output() searched_questions: EventEmitter<Question[]> = new EventEmitter<
    Question[]
  >();

  isSearched: boolean = false;

  questions: Question[] | undefined;
  constructor(
    private userService: UserService,
    private router: Router,
    private search_service: SearchService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null)
      this.user = JSON.parse(localStorage.getItem('user')!);
    if (localStorage.getItem('admin') !== null)
      this.admin = JSON.parse(localStorage.getItem('admin')!);

    setInterval(() => {
      if (localStorage.getItem('user') !== null)
        this.user = JSON.parse(localStorage.getItem('user')!);
      if (localStorage.getItem('admin') !== null)
        this.admin = JSON.parse(localStorage.getItem('admin')!);
    }, 100);
  }

  getValue(search: any) {
    console.log(`search called with ${search}`);
    if (search !== '')
      this.userService.searchQuestion(search).subscribe((data) => {
        console.log(data);
        this.search_service.store_searched_questions(data);
        this.router.navigate(['/user']);
        if (data.length == 0) {
          alert('No Question Found');
        }
      });
  }

  sendQuestionToGetAnswer(id: number) {
    console.log(id);
    this.userService.getQuestionId(id);
    this.router.navigate(['/get-answer']);
    this.isSearched = false;
  }

  logout() {
    localStorage.clear();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.admin = JSON.parse(localStorage.getItem('admin')!);
    this.router.navigate(['/login']);
  }
}
