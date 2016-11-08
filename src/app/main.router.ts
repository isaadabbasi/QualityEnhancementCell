import { RouterModule, Routes} from '@angular/router';

import { NavBarComponent } from './nav-bar/navbar.component';
import { MainFormComponent } from './main-form/main-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'main-page', component: MainFormComponent}
]

export const routing = RouterModule.forRoot(routes, {useHash: false});