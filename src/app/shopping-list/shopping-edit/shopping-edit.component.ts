import { Component ,  Input , ViewChild ,ElementRef, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shoping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f') slForm! : NgForm;
  subscription!: Subscription ; 
  editItemIndex!: number;
  editMode =false;
  editItem!: Ingredient;
  constructor(private shoppingListService : ShoppingListService ){}
  
  ngOnInit(): void {
    this.subscription= this.shoppingListService.startedEditing.subscribe(
       (index:number) => {
             this.editItemIndex =index ;
             this.editMode = true ; 
             this.editItem =this.shoppingListService.getIngredient(index) ;
             this.slForm.setValue({
               name : this.editItem.name,
               amount : this.editItem.amount 

             })
       }
     );
   }

  OnSubmit(form:NgForm){
    const value =form.value ;
    const newIngerdient = new Ingredient(value.name,value.amount);
     if (this.editMode) {
      this.shoppingListService.updateIngeredient(this.editItemIndex,newIngerdient);

     } else {
      this.shoppingListService.addIngredient(newIngerdient);
     }
     this.editMode =false;
     form.reset();

     
  }
  Onclear(){
   this.slForm.reset();

  }
  onDelete(){
    this.shoppingListService.onDeletIngredient(this.editItemIndex);
    this.Onclear();
     
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editMode =false;

  }
}
