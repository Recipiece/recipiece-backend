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
  UnauthorizedException
} from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { CookbookService, ICookbook, RecipeService } from '@recipiece/database';
import { AuthRequest } from '@recipiece/middleware';
import { Types } from 'mongoose';
import { RecipeQueryHelper } from '../../api';

@Controller('cookbooks')
export class CookbooksController {
  constructor(
    private cookbookService: CookbookService,
    private recipeService: RecipeService,
    private recipeQueryHelper: RecipeQueryHelper
  ) {}

  @Post('')
  @HttpCode(201)
  public async createCookbook(@Req() request: AuthRequest) {
    const cookbook: Partial<ICookbook> = {
      ...request.body,
      owner: request.user.id,
    };
    const book = await this.cookbookService.create(cookbook);
    return book.asResponse();
  }

  @Get(':bookId')
  @HttpCode(200)
  public async getCookbook(@Param() params: { bookId: string }) {
    const { bookId } = params;
    const book = await this.cookbookService.findById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook with id ${bookId} does not exist.`);
    }
    return book.asResponse();
  }

  @Delete(':bookId')
  @HttpCode(204)
  public async deleteCookbook(@Req() request: AuthRequest) {
    const { bookId } = request.params;
    const book = await this.cookbookService.findById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook with id ${bookId} does not exist.`);
    }
    if (book.owner !== request.user.id) {
      throw new UnauthorizedException();
    }
    await this.cookbookService.delete(bookId);
  }

  @Put(':bookId')
  @HttpCode(200)
  public async updateCookbook(@Req() request: AuthRequest) {
    const { bookId } = request.params;
    const book = await this.cookbookService.findById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook with id ${bookId} does not exist.`);
    }
    if (book.owner !== request.user.id) {
      throw new UnauthorizedException();
    }
    const updateBody: Partial<ICookbook> = request.body;
    const updatedBook = await this.cookbookService.update(bookId, updateBody);
    return updatedBook.asResponse();
  }

  @Get('list/:userId')
  @HttpCode(200)
  public async listCookbooksForUser(@Req() request: AuthRequest) {
    const { userId } = request.params;
    if (userId !== request.user.id) {
      throw new UnauthorizedException();
    }

    const query = request.query;
    const page = +(request.query.page || '1');

    const findQuery: any = {
      owner: userId,
    };
    const trimmedName = (query?.name || '').toString().trim();
    if (trimmedName !== '') {
      findQuery.name = {
        $regex: trimmedName,
        $options: 'i',
      };
    }

    const results = await this.cookbookService.findPage(findQuery, page);
    const data = results.docs.map((cb) => cb.asResponse());
    return {
      data: data,
      page: page,
      more: results.hasNextPage,
    };
  }

  @Get(':bookId/recipes')
  @HttpCode(200)
  public async listRecipesForCookbook(@Req() request: AuthRequest) {
    const { bookId } = request.params;
    const book = await this.cookbookService.findById(bookId);
    if (Utils.nou(book)) {
      throw new NotFoundException(`Cookbook with id ${bookId} does not exist.`);
    }
    if (book.owner !== request.user.id) {
      throw new UnauthorizedException();
    }
    const page = +(request.query.page || '1');

    let findQuery: any = {
      _id: {
        $in: book.recipes.map((recipeId: string) => new Types.ObjectId(recipeId)),
      },
    };
    findQuery.private = book.owner === request.user.id;
    findQuery = this.recipeQueryHelper.buildNameQuery(findQuery, request);
    findQuery = this.recipeQueryHelper.buildTagsQuery(findQuery, request);
    findQuery = this.recipeQueryHelper.buildIngredientsQuery(findQuery, request);

    const recipePage = await this.recipeService.findPage(findQuery, page);
    const data = recipePage.docs.map((d) => d.asResponse());
    return {
      data: data,
      page: page,
      more: recipePage.hasNextPage,
    };
  }
}
