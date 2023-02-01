import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shoping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

   recipeChanged= new Subject<Recipe[]>();
// private recipes: Recipe[] = [
  //  new Recipe(
     //'Tasty schnitzel',
    // 'A super-tasty shnetzel ',
   ///  'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2Farchive%2F1fdd7b37f52a830c0068f9fe314440276f209db9',
   //   [new Ingredient('Meet', 1), new Ingredient('Fresh fries', 20)]
   // ),
   // new Recipe(
   //   'Big fat Birger ',
   //   'Super delecies',
   //   'https://www.lesepicesrient.fr/wp-content/uploads/2022/05/burger-barbecue-miel-01.jpg ',
   //   [new Ingredient('buns', 2), new Ingredient('Meat', 1)]
  //  ),
 // ];
    private  recipes :Recipe []=[] ;
    static imagepath: string;
  constructor(private shoppingListService: ShoppingListService) {}
  SetRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());


  }

  getRecipie() {
    return this.recipes.slice();
    
  }
  GetRecepie(index:number){
     return this.recipes[index] ;
  }
  addIngredTshoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number , newRecipe : Recipe){
    this.recipes[index] =  newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number ){
    this.recipes.splice(index ,1) ;
    this.recipeChanged.next(this.recipes.slice());

  }
}
