import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent   implements OnInit {
   recipe!: Recipe ;
   id!: number;
   constructor(private recipieSerices : RecipeService ,
                      private route : ActivatedRoute,
                      private router: Router ){}

   ngOnInit(): void {
     this.route.params.
     subscribe((params: Params) =>{
          this.id = +params['id'];
          this.recipe = this.recipieSerices.GetRecepie(this.id);
     }
     )
   }
   onAddToshoppingList(){
    this.recipieSerices.addIngredTshoppingList(this.recipe.ingredients);

   }
   OneditRecipe(){
      this.router.navigate(['../' , this.id, 'edit'], {relativeTo:this.route});
   }
   OndeletRecipe(){
    this.recipieSerices.deleteRecipe(this.id) ;
    this.router.navigate(['../'] , {relativeTo: this.route});


   }
}
