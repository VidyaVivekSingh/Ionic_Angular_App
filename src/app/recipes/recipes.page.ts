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
  loading = false;

  ngOnInit() {
    // way to call ngOnInit after routing

    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.recipes = this.RecipeService.getAllRecipe();
    //   }
    // });

    // this.loading = true;

    this.RecipeService.fetchPerson();
    this.recipes = this.RecipeService.getAllRecipe();

    // way to call ngOnInit after routing
    this.recipeSubs = this.RecipeService.recipeChanged.subscribe(recipe => {
      this.recipes = recipe;

      // this.loading = false;
    });
  }

  ngOnDestroy() {
    this.recipeSubs.unsubscribe();
  }
}
