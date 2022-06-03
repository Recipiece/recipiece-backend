import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { Recipe, RecipeService } from '@recipiece/database';
import { AuthenticationGuard, AuthRequest } from '@recipiece/middleware';
import { getCursor, RecipeQuery } from '../../api';

@Controller('recipes')
export class RecipesController {
  constructor(private recipeService: RecipeService) {}

  @Post('')
  @HttpCode(201)
  @UseGuards(AuthenticationGuard)
  public async createRecipe(@Req() request: AuthRequest, @Body() body: Partial<Recipe>) {
    const recipe = await this.recipeService.create(request.user.id, body);
    return recipe;
  }

  @Put(':recipeId')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  public async updateRecipe(@Req() request: AuthRequest) {
    const recipeId = +request.params.recipeId;
    const updateBody: Partial<Recipe> = request.body;

    const recipe = await this.recipeService.getById(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(`Recipe ${recipeId} not found`);
    }
    if (recipe.owner_id !== request.user.id) {
      throw new UnauthorizedException();
    }
    return await this.recipeService.update(recipeId, updateBody);
  }

  @Delete(':recipeId')
  @HttpCode(204)
  @UseGuards(AuthenticationGuard)
  public async deleteRecipe(@Req() request: AuthRequest) {
    const recipeId = +request.params.recipeId;
    const recipe = await this.recipeService.getById(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(`Recipe ${recipeId} not found`);
    }
    if (recipe.owner_id !== request.user.id) {
      throw new UnauthorizedException();
    }
    await this.recipeService.delete(recipe.id);
  }

  @Get(':recipeId')
  @HttpCode(200)
  public async getRecipeById(@Req() request: AuthRequest) {
    const recipeId = +request.params.recipeId;
    const recipe = await this.recipeService.getById(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(undefined, `Recipe with id ${recipeId} not found`);
    }
    if (recipe.private && recipe.owner_id !== request.user?.id) {
      throw new UnauthorizedException();
    }
    return recipe;
  }

  @Get('list/:userId')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  public async listRecipesForUser(@Req() request: AuthRequest) {
    const owner = +request.params.userId;

    if (request.user.id !== owner) {
      throw new UnauthorizedException();
    }

    const whereQuery = new RecipeQuery().fromRequest(request);

    const recipes = await this.recipeService.list(getCursor(request), whereQuery, {name: 'asc'});
    return {
      data: recipes,
    };
  }
}
