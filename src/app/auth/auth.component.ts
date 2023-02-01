import { Component, ComponentFactoryResolver, ViewChild, } from "@angular/core";
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription,  } from "rxjs";
import { AlertCompenent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component ({
    selector:'app-auth',
    templateUrl : './auth.component.html'
})

export class AuthComponent {
    isLoginMode = true ;
    isLoading = false ;
    error:string  = '';
   User: any;
    @ViewChild(PlaceHolderDirective)  alerHost!: PlaceHolderDirective;
  componentRefSub!: Subscription;


    constructor(private authService : AuthService   ,private route : ActivatedRoute,
        private router: Router ,    private componentFactoryResolver: ComponentFactoryResolver
        ) {

    }

    OnSwitch(){
this.isLoginMode = !this.isLoginMode ;
    }

    OnSubmit(form:NgForm){
       
        if (!form.valid) {
            return ;
        } 
        const email = form.value.email ;
        const password = form.value.password ;
       let  authOb : Observable<AuthResponseData>;

       this.isLoading=true ;


        if (this.isLoginMode) {
          authOb =  this.authService.signin(email,password);
            
        } else {
           
            authOb = this.authService.Signup(email,password);
        };
        authOb.subscribe(
            resData =>{
                console.log(resData);
                this.isLoading=false;
                this.router.navigate(['/recipes'] );

            },
            errorMessage => {
                console.log(errorMessage);
                this.error=  errorMessage ;
                this.showErrorAlert(errorMessage);

                this.isLoading=false ;
            }           
        )
        form.reset();

    }
    OnHandelError(){
        this.error =null!;
    }
    private showErrorAlert(message: string) {
        const alertComponentFactory =
          this.componentFactoryResolver.resolveComponentFactory(AlertCompenent);
        const hostViewContainerRef = this.alerHost.viewContainRef;
        hostViewContainerRef.clear();
    
        const componentRef = hostViewContainerRef.createComponent(
          alertComponentFactory
        );
        componentRef.instance.message = message;
        this.componentRefSub = componentRef.instance.close.subscribe(() => {
          this.componentRefSub.unsubscribe();
          hostViewContainerRef.clear();
        });
      }
      ngOnDestroy() {
        if (this.componentRefSub) {
          this.componentRefSub.unsubscribe();
        }
      }
}