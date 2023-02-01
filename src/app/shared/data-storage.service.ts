import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipes.service";

@Injectable({providedIn : 'root'})
export  class  DataStorageService {
    constructor(private http : HttpClient  , private recipeService : RecipeService , private authservice :AuthService){}
    
    
    storeRecipes(){
        const recipes =  this.recipeService.getRecipie();
        this.http.put('https://recipeproject-cee88-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(Response =>{
          console.log(Response);
            
        });
    }
    fechRecipes(){
        
            return this.http.get<Recipe[]>('https://recipeproject-cee88-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
            return recipes.map(recipe =>{
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            })
        }),
        tap(recipes => {
            this.recipeService.SetRecipes(recipes);

        })) 
           
            
        
    }
}