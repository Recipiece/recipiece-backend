import { Module } from '@nestjs/common';
import { DatabaseModule } from '@recipiece/database';
import { MemstoreModule } from '@recipiece/memstore';
import { ConverterApiService } from './api';
import { ConvertController } from './routes/convert/convert.controller';
import { CookbooksController } from './routes/cookbooks/cookbooks.controller';
import { RecipesController } from './routes/recipes/recipes.controller';

@Module({
  imports: [DatabaseModule, MemstoreModule],
  controllers: [RecipesController, CookbooksController, ConvertController],
  providers: [ConverterApiService],
})
export class AppModule {}
