import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Ingredient} from   '../shared/ingredients.model';
import { ShoppingListService } from './shoping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers :[ShoppingListService] ,

})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Ingredient[] =[];
  private igChangedSub!: Subscription;
  
  constructor(private shoppingListService : ShoppingListService ){}

  

  ngOnInit() {
    this.ingredients= this.shoppingListService.getIngredients();
   this.igChangedSub= this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=> {
        this.ingredients = ingredients ;
      })
      }
       OnEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index) ;
      }
      ngOnDestroy(): void {
        this.igChangedSub.unsubscribe()
      }
    
  }
 



 