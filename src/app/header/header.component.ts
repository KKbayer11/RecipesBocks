import { Component ,OnDestroy,OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthComponent } from "../auth/auth.component";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
@Component ({
    selector:'app-header',
    templateUrl : './header.component.html'
})

export class HeaderComponent  implements OnInit, OnDestroy {
    isAuthenticate = false ;
    private  userSub! : Subscription;
   constructor (private  dataStorageService : DataStorageService , private authService : AuthService ){ }

 ngOnInit(): void {
  this.userSub = this.authService.user.subscribe( user =>{
   this.isAuthenticate = !user ? false : true ;
  });
   
 }
   OnSaveData(){
    this.dataStorageService.storeRecipes();
 }
 OnFetchData(){
    this.dataStorageService.fechRecipes().subscribe() ;
 }
 ngOnDestroy(): void {
   this.userSub.unsubscribe()
 }
 OnLogout(){
  this.authService.LogOut();
 }
}