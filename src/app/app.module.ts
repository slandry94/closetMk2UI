import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { UserLandingComponent } from './user-landing/user-landing.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ReferringOrgComponent } from './referring-org/referring-org.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserLandingComponent,
    ReferringOrgComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
