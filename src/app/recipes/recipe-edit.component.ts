import { Component, OnInit } from "@angular/core";
import { RecipeService } from './recipes.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Ingredient } from "../shared/ingredients.model";
import { Recipe } from "./recipe.model";


@Component ({
    selector:'app-edit-start',
    templateUrl : './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})

export class RecipiEditComponent  implements OnInit{
    id!: number;
    editMode=false ;
    recipeForm!: FormGroup;
  

    constructor( private route : ActivatedRoute , private recipeServece :RecipeService , private  router : Router){}
    ngOnInit(): void {
        this.route.params.subscribe(
            (params : Params) =>{
                this.id = +params['id'];
                this.editMode=params['id'] != null ;
                this.initForm();
            }
        )
    }
    get controls() {
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onSubmit(){
      const  newRecipe =new Recipe
      (this.recipeForm.value['name'],this.recipeForm.value['description'] ,
       this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients'] );
          if (this.editMode) {
            this.recipeServece.updateRecipe(this.id ,newRecipe);
          }     
          else {
            this.recipeServece.addRecipe(newRecipe);
          }
          this.onCancel();
    }
    onAddIngredients(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup ({
          'name' : new FormControl(null , Validators.required),
          'amount': new FormControl(null , [Validators.required , Validators.pattern(/^[1-9]+[0-9 ]*$/)  ]),
        })
      )
    }
    onCancel(){
      this.router.navigate(['../'] , {relativeTo: this.route});

    }
    OnDeleteIngredient(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index) ;     
    }
    private initForm(){
        let recipeName ='';
        let recipeImagePath ='';
        let recipeDescription=''; 
        let recipeIngredients = new FormArray<FormGroup>([]);
        if (this.editMode) {
          const recipe = this.recipeServece.GetRecepie(this.id);
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name , Validators.required),
                  amount: new FormControl(ingredient.amount ,  [Validators.required , Validators.pattern(/^[1-9]+[0-9 ]*$/)  ]),
                })
              );
            }
          }
        } 

        this.recipeForm = new FormGroup ({
            'name' : new FormControl(recipeName, Validators.required),
            'imagePath' : new FormControl(recipeImagePath , Validators.required),
            'description' : new FormControl(recipeDescription, Validators.required ),
            'ingredients' : recipeIngredients,


        })
    } 
   
  }