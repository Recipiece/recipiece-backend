import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { CookbookService, RecipeService } from '@recipiece/database';
import { AuthenticationGuard, AuthRequest } from '@recipiece/middleware';
import { CookbookQuery, getCursor, RecipeQuery } from '../../api';

@Controller('cookbooks')
@UseGuards(AuthenticationGuard)
export class CookbooksController {
  constructor(private cookbookService: CookbookService, private recipeService: RecipeService) {}

  @Post('')
  @HttpCode(201)
  public async createCookbook(@Req() request: AuthRequest) {
    return await this.cookbookService.create(request.user.id, request.body);
  }

  @Get(':bookId')
  @HttpCode(200)
  public async getCookbook(@Param() params: { bookId: string }) {
    const bookId = +params.bookId;
    const book = await this.cookbookService.getById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook ${bookId} does not exist.`);
    }
    return book;
  }

  @Delete(':bookId')
  @HttpCode(204)
  public async deleteCookbook(@Req() request: AuthRequest) {
    const bookId = +request.params.bookId;
    const book = await this.cookbookService.getById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook with id ${bookId} does not exist.`);
    }
    if (book.owner_id !== request.user.id) {
      throw new UnauthorizedException();
    }
    await this.cookbookService.delete(bookId);
  }

  @Put(':bookId')
  @HttpCode(200)
  public async updateCookbook(@Req() request: AuthRequest) {
    const bookId = +request.params.bookId;
    const book = await this.cookbookService.getById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook with id ${bookId} does not exist.`);
    }
    if (book.owner_id !== request.user.id) {
      throw new UnauthorizedException();
    }
    return await this.cookbookService.update(bookId, request.body);
  }

  @Get('list/:userId')
  @HttpCode(200)
  public async listCookbooksForUser(@Req() request: AuthRequest) {
    const userId = +request.params.userId;
    if (userId !== request.user.id) {
      throw new UnauthorizedException();
    }

    const cookbookWhere = new CookbookQuery().fromRequest(request);
    const cookbooks = await this.cookbookService.list(getCursor(request), cookbookWhere);

    return {
      data: cookbooks,
    };
  }

  @Get(':bookId/recipes')
  @HttpCode(200)
  public async listRecipesForCookbook(@Req() request: AuthRequest) {
    const bookId = +request.params.bookId;
    const book = await this.cookbookService.getById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook ${bookId} not found.`);
    }
    if (book.owner_id !== request.user.id) {
      throw new UnauthorizedException();
    }
    const query = new RecipeQuery().fromRequest(request);

    const queryCursor = request.query?.cursor;
    let cursor;
    if (!Utils.nou(queryCursor)) {
      cursor = +cursor;
    } else {
      cursor = undefined;
    }

    const recipes = await this.cookbookService.listRecipes(book.id, cursor, query);

    return {
      data: recipes,
    };
  }
}
