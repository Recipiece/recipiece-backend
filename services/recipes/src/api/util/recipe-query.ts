import {Request} from 'express';

export function buildNameQuery(mongoQuery: any, req: Request): any {
  const trimmedName = (req.query?.name || '').toString().trim();
  const mqCopy = { ...mongoQuery };

  if (trimmedName !== '') {
    mqCopy.name = {
      $regex: trimmedName,
      $options: 'i',
    };
  }
  return mqCopy;
}

export function buildTagsQuery(mongoQuery: any, req: Request): any {
  const tags = req.query?.tags || [];
  const mqCopy = { ...mongoQuery };

  if (tags.length > 0) {
    mqCopy.tags = {
      $all: tags,
    };
  }
  return mqCopy;
}

export function buildIngredientsQuery(mongoQuery: any, req: Request): any {
  const ingredients = (req.query?.ingredients as string[]) || [];
  const mqCopy = { ...mongoQuery };
  if (ingredients.length > 0) {
    const ingsRegex = `(${ingredients.join('|')})`;
    mqCopy.sections = {
      $elemMatch: {
        ingredients: {
          $elemMatch: {
            name: {
              $regex: ingsRegex,
              $options: 'i',
            },
          },
        },
      },
    };
  }
  return mqCopy;
}
