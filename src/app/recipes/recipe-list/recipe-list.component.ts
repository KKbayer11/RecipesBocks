import { Component ,  OnDestroy,  OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

 
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements  OnInit ,OnDestroy {

  recipes:Recipe[] =[];
  subscription!: Subscription;

  constructor(
    private recipieServers: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
     this.subscription=  this.recipieServers.recipeChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes= recipes ;
      }
    )
    this.recipes=this.recipieServers.getRecipie();
    
  }
  OnAddedNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});

      };
  ngOnDestroy(): void {
   this.subscription.unsubscribe(); 
  }
 
}

