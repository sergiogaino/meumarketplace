import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResultComponent } from './pages/result/result.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ConfirmationComponent  } from './pages/confirmation/confirmation.component';
import { LoadComponent  } from './pages/load/load.component';
import { AppAuthGuard } from './app.authguard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'result', component: ResultComponent},
  { path: 'load', component: LoadComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'login', component: HomeComponent, canActivate: [AppAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
