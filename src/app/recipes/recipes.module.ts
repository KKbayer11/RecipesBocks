import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DropdownDirective } from "../shared/dropdown.directive";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipiEditComponent } from "./recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutingModules } from "./recipes.routing.module";

@NgModule({
    declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipiEditComponent,
    

    
    
    ],
    imports : [RouterModule, CommonModule, ReactiveFormsModule, RecipesRoutingModules ],
    
})
export class RecipesModule {

}