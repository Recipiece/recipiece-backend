import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Environment, EnvironmentSniffer } from '@recipiece/common';
import {
  CommonIngredient,
  CommonIngredientName,
  CommonIngredientNameSchema,
  CommonIngredientNameService,
  CommonIngredientSchema,
  CommonIngredientService,
} from './model/common-ingredient';
import { Cookbook, CookbookSchema, CookbookService } from './model/cookbook';
import {
  ForgotPasswordToken,
  ForgotPasswordTokenSchema,
  ForgotPasswordTokenService,
} from './model/forgot-password-token';
import { Measure, MeasureSchema, MeasureService } from './model/measure';
import { Recipe, RecipeSchema, RecipeService } from './model/recipe';
import { Session, SessionSchema } from './model/session';
import { SessionService } from './model/session/session.service';
import { StagedUser, StagedUserSchema, StagedUserService } from './model/staged-user';
import { User, UserSchema, UserService } from './model/user';

EnvironmentSniffer.load();

const username = Environment.DB_USER;
const password = Environment.DB_PASSWORD;
const host = Environment.DB_HOST;
const port = Environment.DB_PORT;
const dbName = Environment.DB_NAME;
const uri = `mongodb://${host}:${port}`;

@Module({
  controllers: [],
  imports: [
    MongooseModule.forRoot(uri, {
      auth: {
        username: username,
        password: password,
      },
      dbName: dbName,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: StagedUser.name, schema: StagedUserSchema },
      { name: Session.name, schema: SessionSchema },
      { name: ForgotPasswordToken.name, schema: ForgotPasswordTokenSchema },
      { name: Cookbook.name, schema: CookbookSchema },
      { name: Measure.name, schema: MeasureSchema },
      { name: CommonIngredient.name, schema: CommonIngredientSchema },
      { name: CommonIngredientName.name, schema: CommonIngredientNameSchema },
    ]),
  ],
  providers: [
    UserService,
    RecipeService,
    StagedUserService,
    SessionService,
    ForgotPasswordTokenService,
    CookbookService,
    MeasureService,
    CommonIngredientService,
    CommonIngredientNameService,
  ],
  exports: [
    MongooseModule,
    UserService,
    RecipeService,
    StagedUserService,
    SessionService,
    ForgotPasswordTokenService,
    CookbookService,
    MeasureService,
    CommonIngredientService,
    CommonIngredientNameService,
  ],
})
export class DatabaseModule {}
