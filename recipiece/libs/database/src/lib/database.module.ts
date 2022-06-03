import { Module } from '@nestjs/common';
import { CommonIngredientService } from './model/common-ingredient/common-ingredient.service';
import { CookbookService } from './model/cookbook/cookbook.service';
import { ForgotPasswordService } from './model/forgot-password/forgot-password.service';
import { MeasureService } from './model/measure/measure.service';
import { RecipeService } from './model/recipe/recipe.service';
import { SessionService } from './model/session/session.service';
import { ShoppingListService } from './model/shopping-list/shopping-list.service';
import { StagedUserService } from './model/staged-user/staged-user.service';
import { UserLoginService } from './model/user-login/user-login.service';
import { UserPermissionsService } from './model/user-permissions/user-permissions.service';
import { UserService } from './model/user/user.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [],
  providers: [
    UserService,
    PrismaService,
    RecipeService,
    CookbookService,
    ShoppingListService,
    UserLoginService,
    UserPermissionsService,
    StagedUserService,
    SessionService,
    ForgotPasswordService,
    MeasureService,
    CommonIngredientService,
  ],
  exports: [
    UserService,
    RecipeService,
    CookbookService,
    ShoppingListService,
    UserLoginService,
    UserPermissionsService,
    StagedUserService,
    SessionService,
    ForgotPasswordService,
    MeasureService,
    CommonIngredientService,
    PrismaService,
  ],
})
export class DatabaseModule {}
