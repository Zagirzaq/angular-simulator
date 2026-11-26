import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: '**', component: NotFoundPageComponent }
];
