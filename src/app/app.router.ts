import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dashboard/dashboard.component';

// Route Configuration
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashBoardComponent },
  { path: '**', redirectTo: 'home' }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);