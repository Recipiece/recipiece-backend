import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '@recipiece/database';
import { RecipieceAuthMiddleware } from '@recipiece/middleware';
import { ConverterApiService, RecipeQueryHelper } from './api';
import { ConvertController } from './routes/convert/convert.controller';
import { CookbooksController } from './routes/cookbooks/cookbooks.controller';
import { RecipesController } from './routes/recipes/recipes.controller';
import { MemstoreModule } from '@recipiece/memstore';

@Module({
  imports: [DatabaseModule, MemstoreModule],
  controllers: [RecipesController, CookbooksController, ConvertController],
  providers: [RecipeQueryHelper, ConverterApiService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RecipieceAuthMiddleware)
      .exclude({ path: 'recipes/.+', method: RequestMethod.GET })
      .forRoutes(RecipesController, CookbooksController, ConvertController);
  }
}
