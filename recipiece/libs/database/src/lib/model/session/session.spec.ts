import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Utils } from "@recipiece/common";
import { Session } from './session.schema';
import { Types } from 'mongoose';

describe('Session', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Session.name),
          useValue: jest.mock('./Session'),
        }
      ],
    }).compile();
  });

  it('should be able to serialize a session', async () => {
    const session = new Session();
    session.id = 'testid';
    session.owner = new Types.ObjectId('ffffffffffffffffffffffff');
    session.created = Utils.utcNow();

    expect(session.serialize()).toBeTruthy();
  });

  it('should be able to deserialize a session', () => {});
});
