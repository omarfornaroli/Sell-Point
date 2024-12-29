import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SellPointComponent } from './components/sell/sell-point.component';
import { AuthGuard } from './services/auth.services';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sell', component: SellPointComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }
];
