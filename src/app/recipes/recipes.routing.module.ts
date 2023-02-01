import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipiEditComponent } from "./recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolverService } from "./recipes.resolver.service";

const routes : Routes =[
    {path: '' , component : RecipesComponent , canActivate: [AuthGuard], children :[       
        { path : '' , component :RecipeStartComponent } ,
        { path: 'new', component: RecipiEditComponent },
        {path : ':id', component : RecipeDetailComponent , resolve : [RecipeResolverService]  } ,
        { path: ':id/edit', component: RecipiEditComponent , resolve : [RecipeResolverService]}] },
];
@NgModule({
 imports : [RouterModule.forChild(routes)],
 exports:[RouterModule]
})
export  class RecipesRoutingModules {

}