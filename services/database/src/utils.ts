import { ObjectId } from 'mongodb';
import { Request } from 'express';

export function restoreObjectId(object: any): any {
  const copy = { ...object };
  for (let [key, value] of Object.entries(copy)) {
    if (key === '_id') {
      copy[key] = new ObjectId(value as string);
    } else if (Array.isArray(value)) {
      copy[key] = value.map((v) => restoreObjectId(v));
    } else if (value instanceof RegExp) {
      copy[key] = value;
    } else if (typeof value === 'object') {
      copy[key] = restoreObjectId(value);
    } else {
      copy[key] = value;
    }
  }
  return copy;
}

export function stripObjectId(object: any): any {
  const copy = { ...object };
  for (let [key, value] of Object.entries(copy)) {
    if (key === '_id') {
      copy[key] = (value as ObjectId).toHexString();
    } else if (Array.isArray(value)) {
      copy[key] = value.map((v) => stripObjectId(v));
    } else if (typeof value === 'object') {
      copy[key] = stripObjectId(value);
    } else {
      copy[key] = value;
    }
  }
  return copy;
}
