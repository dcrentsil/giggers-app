import { GiggersComponent } from './giggers/giggers.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GiggersService } from './giggers.service';
import { CreategiggerComponent } from './creategigger/creategigger.component';
import {RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
    { path: '',redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'giggers',component: GiggersComponent },
    { path: 'signup', component: CreategiggerComponent}
  ];

  
// export roues
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);