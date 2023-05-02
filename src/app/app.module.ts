import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { NavBarComponent } from './MyComponents/nav-bar/nav-bar.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { UserComponent } from './MyComponents/user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './MyComponents/register/register.component';
import { FooterComponent } from './MyComponents/footer/footer.component';
import { AdminLoginComponent } from './MyComponents/admin-login/admin-login.component';
import { AnswerComponent } from './MyComponents/answer/answer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    RegisterComponent,
    FooterComponent,
    AdminLoginComponent,
    AnswerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
