import { Environment } from '@common/environment';
import { DatabaseConstants, Endpoints } from '@common/constants';
import { describe } from 'mocha';
import nock from 'nock';
import expect from 'expect';
import { stageUser } from 'auth/src/api/staged-user/stage';

describe('Staging Users', () => {
  function nockStagedUserSave(email: string, password: string) {
    return nock(`http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`)
      .get(`/${DatabaseConstants.collections.stagedUsers}/${Endpoints.database.save}`)
      .reply(201, {
        email: email,
        password: password,
        id: '1',
      });
  }

  it('should allow users to be staged', async () => {
    const email = 'test@asdf.qwer';
    const password = 'pass1234';

    nockStagedUserSave(email, password);

    const stagedUser = await stageUser(email, password);
    expect(stagedUser.id).toEqual('1');
  });
});
