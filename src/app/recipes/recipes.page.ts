import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss']
})
export class RecipesPage implements OnInit, OnDestroy {

  constructor(private router: Router, private RecipeService: RecipesService) { }
  private recipeSubs: Subscription;
  recipes: Recipe[];
  ngOnInit() {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.recipes = this.RecipeService.getAllRecipe();
    //   }
    // });
    this.recipes = this.RecipeService.getAllRecipe();
    this.recipeSubs = this.RecipeService.recipeChanged.subscribe(recipe => {
      this.recipes = recipe;
    });
  }

  ngOnDestroy() {
    this.recipeSubs.unsubscribe();
  }
}
