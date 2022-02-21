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
} from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { IRecipe, RecipeService } from '@recipiece/database';
import { AuthRequest } from '@recipiece/middleware';
import { RecipeQueryHelper } from '../../api';

@Controller('recipes')
export class RecipesController {
  constructor(private recipeQueryHelper: RecipeQueryHelper, private recipeService: RecipeService) {}

  @Post('')
  @HttpCode(201)
  public async createRecipe(@Body() body: Partial<IRecipe>) {
    const recipe = await this.recipeService.create(body);
    return recipe.asResponse();
  }

  @Put(':recipeId')
  @HttpCode(200)
  public async updateRecipe(@Req() request: AuthRequest) {
    const { recipeId } = request.params;
    const updateBody: Partial<IRecipe> = request.body;

    const recipe = await this.recipeService.findById(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(undefined, `Recipe with id ${recipeId} not found`);
    }
    if (recipe.owner !== request.user.id) {
      throw new UnauthorizedException();
    }
    const updated = await this.recipeService.update(recipeId, updateBody);
    return updated.asResponse();
  }

  @Delete(':recipeId')
  @HttpCode(204)
  public async deleteRecipe(@Req() request: AuthRequest) {
    const { recipeId } = request.params;
    const recipe = await this.recipeService.findById(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(undefined, `Recipe with id ${recipeId} not found`);
    }
    if (recipe.owner !== request.user.id) {
      throw new UnauthorizedException();
    }
    await this.recipeService.delete(recipe.id);
  }

  @Get(':recipeId')
  @HttpCode(200)
  public async getRecipeById(@Req() request: AuthRequest) {
    const { recipeId } = request.params;
    const recipe = await this.recipeService.findById(recipeId);
    if (Utils.nou(recipe)) {
      throw new NotFoundException(undefined, `Recipe with id ${recipeId} not found`);
    }
    if (recipe.private && recipe.owner !== request.user?.id) {
      throw new UnauthorizedException();
    }
    return recipe.asResponse();
  }

  @Get('list/:userId')
  @HttpCode(200)
  public async listRecipesForUser(@Req() request: AuthRequest) {
    const owner = request.params.userId;

    if (request.user.id !== owner) {
      throw new UnauthorizedException();
    }

    let requestQuery: any = {};

    // only query on certain things
    requestQuery.owner = request.user.id;
    requestQuery.private = owner === request.user.id;
    requestQuery = this.recipeQueryHelper.buildNameQuery(requestQuery, request);
    requestQuery = this.recipeQueryHelper.buildTagsQuery(requestQuery, request);
    requestQuery = this.recipeQueryHelper.buildIngredientsQuery(requestQuery, request);

    const page = await this.recipeService.findPage(requestQuery, +(request.query.page || '1'));
    const docs = page.docs.forEach((d) => d.asResponse());

    return {
      data: docs,
      more: page.hasNextPage,
      page: page.nextPage,
    };
  }
}
