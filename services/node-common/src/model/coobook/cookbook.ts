import { DatabaseConstants } from '../../constants';
import { DatabaseModel } from '../database-model';
import { ICookbook } from './cookbook.i';

export class Cookbook extends DatabaseModel<ICookbook> implements ICookbook {
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

  public get recipes(): string[] {
    return this.model.recipes;
  }
  public set recipes(value: string[]) {
    this.model.recipes = value;
  }

  public get owner(): string {
    return this.model.owner;
  }
  public set owner(value: string) {
    this.model.owner = value;
  }

  constructor(model: Partial<ICookbook>) {
    super(DatabaseConstants.collections.recipeBooks, (d) => new Cookbook(d), model);
  }

  public asJson(): Partial<ICookbook> {
    return {
      ...this.model,
    };
  }
}
