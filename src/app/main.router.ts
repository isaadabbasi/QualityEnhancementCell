import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth-guard.service';
import { RouterModule, Routes, Route} from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component'
import { LoginComponent } from './components/login/login.component';
import { PlaceHolderComponent } from './components/dashboard/dashboard-placeholder/placeholder.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { NavBarComponent } from './components/nav-bar/navbar.component';
import { RankingComponent } from './components/dashboard/dashboard-ranking/ranking.component'
import { StartSurveyComponent } from './components/dashboard/dashboard-start/start.component'


const fallback: Route = {
    path: '**',
    component: StartSurveyComponent
}

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'survey', component: MainFormComponent},
    {path: 'dashboard', canActivateChild: [AuthGuard], component: DashboardComponent, children: [
        {path:'start', component: StartSurveyComponent},
        {path:'rankings', component: RankingComponent},
        {path:'', component: PlaceHolderComponent },
        fallback
    ]},
]

export const routing = RouterModule.forRoot(routes, {useHash: false});