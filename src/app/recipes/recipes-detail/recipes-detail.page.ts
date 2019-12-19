import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.page.html',
  styleUrls: ['./recipes-detail.page.scss'],
})
export class RecipesDetailPage implements OnInit {

  loadedRecipe: Recipe;

  constructor(
    private router: Router,
    private recipeService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController

  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        // redirect
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
    });
  }
  onDeleteRecipe = () => {
    this.alertCtrl.create({
      header: 'Are You Sure?', message: 'Do you really want to delete the item?', buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.recipeService.deleteRecipe(this.loadedRecipe.id);
          this.router.navigate(['./recipes']);
        }
      }]
    }).then(alertElem => alertElem.present());
  }

}
