import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS}  from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoping-list.service';
import { AppRoutingModule } from './app.routing.module';
import { RecipeService } from './recipes/recipes.service';
import { AuthComponent } from './auth/auth.component';
import { LoodingSpinnerComponnent } from './shared/looding-spinner/looding-spinner.component';
import { AuthInterseptor } from './auth/auth.interceptor.service';
import { AlertCompenent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder/placeholder.directive';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoodingSpinnerComponnent,
    AlertCompenent,
    PlaceHolderDirective,
    DropdownDirective
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers :[ShoppingListService, RecipeService, 
   {provide : HTTP_INTERCEPTORS , 
    useClass : AuthInterseptor
     ,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
