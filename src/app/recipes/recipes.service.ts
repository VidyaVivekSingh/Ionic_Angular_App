import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schnitzel',
      imageUrl:
        'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/5/14/1/WU1902_Italian-Chicken-Sheet-Pan-Supper_s4x3.jpg.rend.hgtvcom.826.620.suffix/1526332485385.jpeg',
      ingredients: ['ing1', 'ing2']
    },
    {
      id: 'r2',
      title: 'Schnitzel',
      imageUrl:
        'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/5/14/1/WU1902_Italian-Chicken-Sheet-Pan-Supper_s4x3.jpg.rend.hgtvcom.826.620.suffix/1526332485385.jpeg',
      ingredients: ['ing1', 'ing2']
    }
  ];

  constructor(private http: HttpClient) { }

  fetchPerson() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://swapi.co/api/people';
    this.http.get<any>(proxyurl + url)
      .pipe(map(resData => {
        return resData.results.map(character => character.name);
      }))
      .subscribe(response => console.log(response));
  }

  getAllRecipe() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id === recipeId;
      })
    };
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter((recipe) => {
      return recipe.id !== recipeId;
    });
    this.recipeChanged.next(this.recipes);
  }
}
