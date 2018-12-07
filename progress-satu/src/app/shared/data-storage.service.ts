import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map } from "rxjs/operators";

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {}

storeRecipe() {
  return this.http.put('https://ng-recipe-book-c427c.firebaseio.com/recipe.json', this.recipeService
.getRecipes());
}

getRecipes() {
    this.http.get('https://ng-recipe-book-c427c.firebaseio.com/recipe.json')
    .pipe(map(
        (response: Response) => {
            const recipes: Recipe[] = response.json();
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    console.log(recipe);
                    recipe['ingredients'] = [];
                }
            }
            return recipes;
        }
    ))
    .subscribe(
        (recipes: Recipe[]) => {

            this.recipeService.setRecipes(recipes);
        }
    );
    }
}