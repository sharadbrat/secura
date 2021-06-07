import { assert } from 'chai';

import { copyData } from '@/core/utils/copy-data';


describe('Core | Utils | copyData', () => {

  it('Works', () => {
    const objectToCopy = { a: 'a', b: 'b', c: { c: 'c' } };

    const result = copyData(objectToCopy);

    assert.deepEqual(result, objectToCopy);
    assert.notEqual(result, objectToCopy);
  });

});
