import { ObjectId } from 'mongodb';

export function restoreObjectId(object: any): any {
  const copy = { ...object };
  for (let [key, value] of Object.entries(copy)) {
    if (key === '_id') {
      copy[key] = _convertObjectIdField(value);
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

function _convertObjectIdField(valueOfIdKey: any) {
  if(typeof valueOfIdKey === 'string') {
    return new ObjectId(valueOfIdKey);
  } else {
    // it's an object with nested properties
    // support these as needed
    const valCopy = {...valueOfIdKey};
    if(valCopy.$in)  {
      valCopy.$in = valCopy.$in.map((inVal: string) => new ObjectId(inVal));
    }
    return valCopy;
  }
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
