import { Document, Model, Types } from "mongoose";
import { IBaseModel } from "./base-model";
import { PaginateModel, PaginateResult } from 'mongoose';
import { Environment } from "@recipiece/common";

export abstract class ModelService<D extends M & Document, M extends IBaseModel> {
  constructor(protected model: Model<D> | PaginateModel<D>) {

  }

  public async create(body: Partial<M>): Promise<M> {
    return new this.model(body).save();
  }

  public async update(id: string, body: Partial<M>): Promise<M> {
    const foundEntity = await this.model.findById(id);
    if(!foundEntity) {
      throw new Error();
    }
    await foundEntity.update(body);
    return this.model.findById(id);
  }

  public async save(entity: Partial<M>): Promise<M> {
    if(entity.id) {
      return this.update(entity.id, entity);
    } else {
      return this.create(entity);
    }
  }

  public async findOne(query: any): Promise<M> {
    return this.model.findOne(query);
  }

  public async find(query: any): Promise<M[]> {
    return await this.model.find(query);
  }

  public async findPage(query: any, page: number = 1): Promise<PaginateResult<M>> {
    if(this.model['paginate']) {
      return await (<PaginateModel<D>>this.model).paginate(query, {
        page: page,
        limit: Environment.DB_PAGE_SIZE,
      });
    } else {
      throw new Error(`Unsupported model type ${this.model.name} for pagination!`);
    }
  }

  public async findById(id: string | Types.ObjectId): Promise<M> {
    return this.model.findById(id);
  }

  public async findByIdAndDelete(id: string | Types.ObjectId): Promise<M> {
    return this.model.findByIdAndDelete(id);
  }

  public async delete(id: string | Types.ObjectId) {
    const idToDelete = typeof id === 'string' ? new Types.ObjectId(id) : id;
    await this.model.deleteOne({_id: idToDelete});
  }

  public async deleteMany(query: any) {
    await this.model.deleteMany(query);
  }
}
