import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { IRecipe, IRecipeAdvancedOptions, IRecipeSection } from './recipe.i';

export class Recipe extends DatabaseModel<IRecipe> implements IRecipe {
  public get name(): string {
    return this.model.name;
  }
  public set name(value: string) {
    this.model.name = value;
  }

  public get description(): string {
    return this.model.description;
  }
  public set description(value: string) {
    this.model.description = value;
  }

  public get private(): boolean {
    return this.model.private;
  }
  public set private(value: boolean) {
    this.model.private = value;
  }

  public get advanced(): IRecipeAdvancedOptions {
    return this.model.advanced;
  }
  public set advanced(value: IRecipeAdvancedOptions) {
    this.model.advanced = value;
  }

  public get sections(): IRecipeSection[] {
    return this.model.sections;
  }
  public set sections(value: IRecipeSection[]) {
    this.model.sections = value;
  }

  public get tags(): string[] {
    return this.model.tags;
  }
  public set tags(value: string[]) {
    this.model.tags = value;
  }

  public get owner(): string {
    return this.model.owner;
  }
  public set owner(value: string) {
    this.model.owner = value;
  }

  constructor(model: Partial<IRecipe>) {
    super(DatabaseConstants.collections.recipes, (d) => new Recipe(d), model);
  }

  public asJson(): Partial<IRecipe> {
    return {...this.model};
  }
}
