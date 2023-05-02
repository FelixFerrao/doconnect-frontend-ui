import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin/Model/admin';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('admin') !== null) this.router.navigate(['/admin']);
    this.admin = JSON.parse(localStorage.getItem('admin')!);
  }

  admin = new Admin();

  sendAdminData(admin: Admin) {
    this.adminService.sendAdminData(admin);
  }
  adminLogin(data: any) {

    let email: string = '';
    let password: string = '';

    email = data.email;
    password = data.password;

    this.adminService.adminLogin(email, password).subscribe(
      (data) => {
        localStorage.setItem('admin', JSON.stringify(data));
        this.router.navigate(['/admin']);
      },
      (err) => {
        alert('Email or Password Wrong');
      }
    );
  }
}
