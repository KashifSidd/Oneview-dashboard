import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './shared/components/page404/page404.component';
import { Page500Component } from './shared/components/page500/page500.component';
import { AuthGuard } from './shared/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: ()=> import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'page500',
    component:Page500Component,
    data: {title : "Server Error"}
  },
  {
    path: '**',
    pathMatch:'full',
    component:Page404Component,
    data: {title : "Invalid Path"}
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
