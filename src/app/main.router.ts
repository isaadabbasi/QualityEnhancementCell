import { RouterModule, Routes, Route} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginComponent } from './login/login.component';
import { PlaceHolderComponent } from './dashboard/dashboard-placeholder/placeholder.component';
import { MainFormComponent } from './main-form/main-form.component';
import { NavBarComponent } from './nav-bar/navbar.component';
import { StartSurveyComponent } from './dashboard/dashboard-start/start.component'


const fallback: Route = {
    path: '**',
    component: StartSurveyComponent
}

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'main-page', component: MainFormComponent},
    {path: 'dashboard', component: DashboardComponent, children: [
        {path:'start', component: StartSurveyComponent},
        {path:'', component: PlaceHolderComponent },
        fallback
    ]},
]

export const routing = RouterModule.forRoot(routes, {useHash: false});