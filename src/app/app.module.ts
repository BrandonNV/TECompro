import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { nav_component } from './nav_bar.component';
import { footer_component } from './footer.component';
import { carrousel_component} from './carrousel.component';



@NgModule({
  declarations: [
    AppComponent,
    nav_component,
    footer_component,
    carrousel_component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
