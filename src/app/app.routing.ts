import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { AppComponent } from './app.component';
import {ProductsComponent} from './products/products.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {ContactComponent} from './contact/contact.component';
import {ListaclientesComponent} from './listaclientes/listaclientes.component';
import {ListaproductosComponent} from './listaproductos/listaproductos.component';
import {CarrouselComponent} from './carrousel.component';
import {PieComponent} from './pie/pie.component';



export const AppRoutes: Routes = [
  { path: 'ProductsComponent', component: ProductsComponent},
  { path: 'AboutusComponent', component: AboutusComponent},
  { path: 'ContactComponent', component: ContactComponent},
  { path: 'ListaclientesComponent', component: ListaclientesComponent},
  { path: 'CarrouselComponent', component: CarrouselComponent},
  { path: 'PieComponent', component: PieComponent},
  { path: 'ListaproductosComponent', component: ListaproductosComponent }];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
