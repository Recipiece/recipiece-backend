-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "preferences" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLogin" (
    "id" SERIAL NOT NULL,
    "password_hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "UserLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermissions" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "UserPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagedUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password_hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "permission_level" TEXT NOT NULL,

    CONSTRAINT "StagedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "advanced_config" JSONB,
    "private" BOOLEAN NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeSection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "RecipeSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" SERIAL NOT NULL,
    "recipe_section_id" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "unit" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "id" SERIAL NOT NULL,
    "recipe_section_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "time_ms" INTEGER,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cookbook" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Cookbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCookbookMembership" (
    "id" SERIAL NOT NULL,
    "cookbook_id" INTEGER NOT NULL,

    CONSTRAINT "RecipeCookbookMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingListItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ordinal" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "shopping_list_id" INTEGER NOT NULL,

    CONSTRAINT "ShoppingListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingListAccess" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "shopping_list_id" INTEGER NOT NULL,

    CONSTRAINT "ShoppingListAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForgotPasswordToken" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "ForgotPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measure" (
    "id" SERIAL NOT NULL,
    "abbrs" TEXT[],
    "category" TEXT NOT NULL,
    "name_s" TEXT NOT NULL,
    "name_p" TEXT NOT NULL,
    "prefer_fractions" BOOLEAN NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonIngredient" (
    "id" SERIAL NOT NULL,
    "names" TEXT[],
    "v_unit" TEXT NOT NULL,
    "v_amount" DOUBLE PRECISION NOT NULL,
    "w_unit" TEXT NOT NULL,
    "w_amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CommonIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeToRecipeCookbookMembership" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_owner_id_key" ON "UserLogin"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermissions_owner_id_key" ON "UserPermissions"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "StagedUser_email_key" ON "StagedUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StagedUser_token_key" ON "StagedUser"("token");

-- CreateIndex
CREATE INDEX "RecipeIngredient_name_idx" ON "RecipeIngredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCookbookMembership_cookbook_id_key" ON "RecipeCookbookMembership"("cookbook_id");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListAccess_shopping_list_id_key" ON "ShoppingListAccess"("shopping_list_id");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_name_s_key" ON "Measure"("name_s");

-- CreateIndex
CREATE INDEX "CommonIngredient_names_idx" ON "CommonIngredient" USING GIN ("names" array_ops);

-- CreateIndex
CREATE UNIQUE INDEX "CommonIngredient_v_unit_key" ON "CommonIngredient"("v_unit");

-- CreateIndex
CREATE UNIQUE INDEX "CommonIngredient_w_unit_key" ON "CommonIngredient"("w_unit");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToRecipeCookbookMembership_AB_unique" ON "_RecipeToRecipeCookbookMembership"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToRecipeCookbookMembership_B_index" ON "_RecipeToRecipeCookbookMembership"("B");

-- AddForeignKey
ALTER TABLE "UserLogin" ADD CONSTRAINT "UserLogin_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissions" ADD CONSTRAINT "UserPermissions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSection" ADD CONSTRAINT "RecipeSection_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipe_section_id_fkey" FOREIGN KEY ("recipe_section_id") REFERENCES "RecipeSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_recipe_section_id_fkey" FOREIGN KEY ("recipe_section_id") REFERENCES "RecipeSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cookbook" ADD CONSTRAINT "Cookbook_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCookbookMembership" ADD CONSTRAINT "RecipeCookbookMembership_cookbook_id_fkey" FOREIGN KEY ("cookbook_id") REFERENCES "Cookbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_shopping_list_id_fkey" FOREIGN KEY ("shopping_list_id") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListAccess" ADD CONSTRAINT "ShoppingListAccess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListAccess" ADD CONSTRAINT "ShoppingListAccess_shopping_list_id_fkey" FOREIGN KEY ("shopping_list_id") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonIngredient" ADD CONSTRAINT "CommonIngredient_v_unit_fkey" FOREIGN KEY ("v_unit") REFERENCES "Measure"("name_s") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonIngredient" ADD CONSTRAINT "CommonIngredient_w_unit_fkey" FOREIGN KEY ("w_unit") REFERENCES "Measure"("name_s") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeCookbookMembership" ADD CONSTRAINT "_RecipeToRecipeCookbookMembership_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeCookbookMembership" ADD CONSTRAINT "_RecipeToRecipeCookbookMembership_B_fkey" FOREIGN KEY ("B") REFERENCES "RecipeCookbookMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
