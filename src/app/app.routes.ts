import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { BestaetigungComponent } from './register/bestaetigung/bestaetigung.component';


export const routes: Routes = [
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'bestaetigung', title: 'Bestaetigung', component: BestaetigungComponent }
];
