import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './MyComponents/admin-login/admin-login.component';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { AnswerComponent } from './MyComponents/answer/answer.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import { UserComponent } from './MyComponents/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'all-questions', component: AllQuestionsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  // { path: 'admin-register', component: AdminRegisterComponent },
  // { path: 'ask-question', component: AskQuestionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'answer/:question_id', component: AnswerComponent },
  // { path: 'chat', component: ChatComponent },
  // { path: 'get-answer', component: GetAnswerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
