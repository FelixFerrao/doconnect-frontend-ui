import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/Model/user';
import { UserService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) this.router.navigate(['/user']);
  }

  register(data: any) {
    let user = new User();
    user.email = data.email;
    user.username = data.username;
    user.password = data.password;

    this.userService.userRegister(user).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/user']);
      },
      (err) => {
        alert('User Already Registered');
        this.router.navigate(['/login']);
      }
    );
  }
}
