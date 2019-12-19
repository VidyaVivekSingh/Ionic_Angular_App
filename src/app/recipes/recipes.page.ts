import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss']
})
export class RecipesPage implements OnInit {

  constructor(private router: Router, private RecipeService: RecipesService) { }
  recipes: Recipe[];
  ngOnInit() {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.recipes = this.RecipeService.getAllRecipe();
    //   }
    // });
    this.recipes = this.RecipeService.getAllRecipe();
    this.RecipeService.recipeChanged.subscribe(recipe => {
      this.recipes = recipe;
    });
  }
}
