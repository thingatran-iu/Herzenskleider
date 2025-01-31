import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { BestaetigungComponent } from './register/bestaetigung/bestaetigung.component';
import { StartseiteComponent } from './startseite/startseite.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', title: 'App Home Page', component: StartseiteComponent},
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'bestaetigung', title: 'Bestaetigung', component: BestaetigungComponent }
];
