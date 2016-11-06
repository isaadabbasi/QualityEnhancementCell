import { RouterModule, Routes} from '@angular/router';

import { NavBarComponent } from './nav-bar/navbar.component';
import { MainFormComponent } from './main-form/main-form.component';

export const routes: Routes = [
    {path: '', component: NavBarComponent},
    {path: 'main-page', component: MainFormComponent}
]

export const routing = RouterModule.forRoot(routes, {useHash: false});