import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { AuthGard } from './services/auth-gard';
import { ContactComponent } from './features/contact/contact.component';
import { DashBoardComponent } from './features/dash-board/dash-board.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'home', component: DashBoardComponent,canActivate: [AuthGard],
        children: [
            {
                path: '', component: HomePageComponent
            },
            {
                path: 'contact', component: ContactComponent
            }
        ]
    },
    {
        path: '**', redirectTo: '/home'
    }
];
