import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './Model/user';
import { UserService } from 'src/app/Service/users.service';
import { UserLoginDTO } from '../dto/UserLoginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // @Output() user_data: EventEmitter<User> = new EventEmitter<User>();

  user = new User();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) this.router.navigate(['/user']);
    else this.router.navigate(['/login']);
  }

  login(data: any) {
    let login_dto = new UserLoginDTO();
    login_dto.email = data.email;
    login_dto.password = data.password;

    this.userService.userLogin(login_dto).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/user']);
      },
      (err) => {
        alert('Username or Password Wrong');
      }
    );
  }
}
