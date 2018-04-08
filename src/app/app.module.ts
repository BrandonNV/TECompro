import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {NavComponent} from './nav_bar.component';
import { footer_component } from './footer.component';
import { CarrouselComponent} from './carrousel.component';
import { ProductsComponent} from './products/products.component';
import { ROUTING } from './app.routing';
import { ProductsService } from './products.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { UserBuyersService } from './user-buyer.service';
import { UserSellersService } from './user-seller.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { ListaclientesComponent } from './listaclientes/listaclientes.component';
import { ListaproductosComponent } from './listaproductos/listaproductos.component';
import { OrderService } from './order.service';
import { ChartsModule } from 'ng2-charts';
import { PieComponent } from './pie/pie.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    footer_component,
    CarrouselComponent,
    ProductsComponent,
    MessagesComponent,
    AboutusComponent,
    ContactComponent,
    ListaclientesComponent,
    ListaproductosComponent,
    PieComponent,
    CarouselComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserModule, ROUTING, ChartsModule , HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )

  ],
  providers: [ProductsService, MessageService , UserBuyersService, UserSellersService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
