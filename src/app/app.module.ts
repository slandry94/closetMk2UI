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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { ReferringOrgService } from './referring-org/referring-org.service';
import { ReferringOrgListComponent } from './referring-org-list/referring-org-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ReferringOrgListDialogComponent } from './referring-org-list/referring-org-list-dialog.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'refOrg/:id/:prog/:mode', component: ReferringOrgComponent},
  {path: 'refOrg', component: ReferringOrgListComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserLandingComponent,
    ReferringOrgComponent,
    ReferringOrgListComponent,
    ReferringOrgListDialogComponent
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
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  entryComponents: [
    ReferringOrgListDialogComponent
  ],
  providers: [ReferringOrgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
