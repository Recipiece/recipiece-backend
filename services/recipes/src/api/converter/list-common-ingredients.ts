import { NextFunction, Response } from 'express';
import { AuthRequest, ICommonIngredient, ICommonIngredientName } from 'recipiece-common';

export async function listCommonIngredients(req: AuthRequest, res: Response, next: NextFunction) {}

export async function listRecipieceIngredients(): Promise<ICommonIngredient[]> {
  
}

export async function listRecipieceIngredientNames(): Promise<ICommonIngredientName[]> {

}
