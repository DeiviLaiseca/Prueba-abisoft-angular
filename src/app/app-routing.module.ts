import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuarioComponent } from './pages/admin-usuario/admin-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [
  {path: '', component: UsuarioComponent},  
  {path: 'usuarios', component: UsuarioComponent},
  {path: 'usuario-admin/:id', component: AdminUsuarioComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
