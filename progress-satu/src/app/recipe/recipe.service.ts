import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

recipes:Recipe[]=[
  new Recipe('A Test Recipe','This is simply a test',
  '../src/app/img/burger.jpg', 
  [
    new Ingredient('meal',1),
    new Ingredient('tomato', 2)
  ]),
  new Recipe('A Test Recipe','This is simply a test','../src/app/img/spaghetti.jpg',
  [
    new Ingredient('rice',1),
    new Ingredient('meal',3),
    new Ingredient('egg',1)
  ]),
];

constructor(private slsService: ShoppingListService) {}

setRecipes(recipe: Recipe[]) {
  this.recipes = recipe;
  this.recipesChanged.next(this.recipes.slice());
}

getRecipes(){
return this.recipes.slice();
}

getRecipe(index:number){
  return this.recipes[index];
}

//method dan parameter ingredient[]
addIngredientsShoppingList(ingredients:Ingredient[]){
  this.slsService.addIngredients(ingredients);
}

addRecipe(recipe: Recipe) {
  this.recipes.push(recipe);
  this.recipesChanged.next(this.recipes.slice());
}

updateRecipe(index: number, newRecipe: Recipe) {
  this.recipes[index]=newRecipe;
  this.recipesChanged.next(this.recipes.slice());
}
deleteRecipe(index: number) {
  this.recipes.splice(index, 1);
  this.recipesChanged.next(this.recipes.slice());
}
}
