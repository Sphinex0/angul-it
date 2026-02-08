import { Routes } from '@angular/router';
import { completionGuard } from './core/guards/completion.guard';
import { inProgressGuard } from './core/guards/in-progress.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Angul-It | Welcome'
  },
  {
    path: 'challenge',
    loadComponent: () => import('./features/captcha/captcha.component').then(m => m.CaptchaComponent),
    title: 'Angul-It | Verify',
    canActivate: [inProgressGuard]
  },
  {
    path: 'result',
    loadComponent: () => import('./features/result/result.component').then(m => m.ResultComponent),
    canActivate: [completionGuard], 
    title: 'Angul-It | Success'
  },
  { path: '**', redirectTo: '' }
];
