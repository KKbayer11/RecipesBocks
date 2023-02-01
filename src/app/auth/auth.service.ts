import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./User.module";

 export interface AuthResponseData{
    idToken :string ,
    email : string,
    refreshToken : string,
    expiresIn :string,
    localId : string ,
    registered? : boolean
}

@Injectable({providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null!);

    
constructor (private http: HttpClient , private router : Router){}

private tokenExpirationTimer : any ;

LogOut(){
    this.user.next(null!);
    this.router.navigate(['/auth']);
    localStorage.removeItem('useData');
    if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        
    }
    this.tokenExpirationTimer = null ;

} 
autoLogout(expurationDuration : number){
    this.tokenExpirationTimer=   setTimeout(()=>{
           this.LogOut;
       },expurationDuration);
   }
    

Signup(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUEa_gAeS18n_1QH_UBvMo4cJCP39mpz4',{
        email:  email,
   password : password ,
   returnSecureToken : true 
    }
  
).pipe(catchError(this.handelError), tap(resData => {
    this.handleAuthentication(resData.email ,resData.localId ,resData.idToken ,+resData.expiresIn )
    
 })
);
 }
autoLogin(){
    const userData:{email:string ; id:string ; _token:string ; _tokenExpirationDate: string ;}= JSON.parse(localStorage.getItem('userData') as string);
    if (!userData) {
        return;
    }
   const loadedUser = new User(
    userData.email,
    userData.id,
    userData._token,
     new Date(userData._tokenExpirationDate) 
   );
   if (loadedUser._token) {
    this.user.next(loadedUser);

   const expurationDuration = new Date(userData._tokenExpirationDate).getTime() -new Date().getTime()
    this.autoLogout(expurationDuration);
    
   }
}



 signin(email:string,password:string){
 return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUEa_gAeS18n_1QH_UBvMo4cJCP39mpz4',{
    email:  email,
    password : password ,
    returnSecureToken : true 
 } 
 ).pipe(catchError(this.handelError) , tap(resData => {
    this.handleAuthentication(resData.email ,resData.localId ,resData.idToken ,+resData.expiresIn )
    
 })
 );
 }

private handleAuthentication(email:string  , userId : string , token:string,  expiresIn:number  ){
    const dateExpiration = new Date(new Date().getTime() + expiresIn *1000 )
    const user = new User(email , userId , token , dateExpiration );
    this.user.next(user);
    this.autoLogout(expiresIn *1000);
    localStorage.setItem('userData' , JSON.stringify(user) );

}

private handelError(errorRes : HttpErrorResponse){
    let errorMessage = 'An error occurd '
    if (!errorRes.error || !errorRes.error.error) {
     return throwError(errorMessage);
 
    }
    switch (errorRes.error.error.message) {
     case 'EMAIL_EXISTS' : 
       errorMessage = 'This email exist alredy'
         break;
     case  'INVALID_PASSWORD' :
        errorMessage = 'The password is invalid '
        break;
     case  'TOO_MANY_ATTEMPTS_TRY_LATER' :
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'  
        break; 
        case 'EMAIL_NOT_FOUND' :
            errorMessage = ' There is no user record corresponding to this identifier. ' 
            break;
 
    }
    return throwError(errorMessage);
}

}


