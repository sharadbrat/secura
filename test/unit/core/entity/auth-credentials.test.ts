import { assert } from 'chai';

import { CredentialsValidator, LoginCredentialsEntity } from '@/core/entity/auth-credentials';
import sinon from 'sinon';


describe('Core | Entity | AuthCredentials', () => {

  describe('CredentialsValidator', () => {

    it('Works', () => {
      assert.isOk(new CredentialsValidator());
    });

    it('method: isPasswordValid', () => {
      const validator = new CredentialsValidator();
      assert.equal(validator.isPasswordValid(null), false);
      assert.equal(validator.isPasswordValid('12345'), false);
      assert.equal(validator.isPasswordValid('qwert'), false);
      assert.equal(validator.isPasswordValid('qwerty'), true);
      assert.equal(validator.isPasswordValid('qwerty12345'), true);
      assert.equal(validator.isPasswordValid('12345123451234512345'), true);
      assert.equal(validator.isPasswordValid('123451234512345123456'), false);
    });

    it('method: isEmailValid', () => {
      const validator = new CredentialsValidator();
      assert.equal(validator.isEmailValid(null), false);
      assert.equal(validator.isEmailValid('a@b.c'), false);
      assert.equal(validator.isEmailValid('a@b.cc'), true);
      assert.equal(validator.isEmailValid('abcde+12345.321QWERTY@my-mail.cco'), true);
      assert.equal(validator.isEmailValid('русская-почта_РОССИЯ+123@моя-пошта.рф'), true);
    });

    it('method: isNameValid', () => {
      const validator = new CredentialsValidator();
      assert.equal(validator.isNameValid(null), false);
      assert.equal(validator.isNameValid('ab'), false);
      assert.equal(validator.isNameValid('abc'), true);
      assert.equal(validator.isNameValid('1abc3'), true);
      assert.equal(validator.isNameValid('1a321bc3'), true);
      assert.equal(validator.isNameValid('12321'), true);
      assert.equal(validator.isNameValid('a_b.c'), true);
      assert.equal(validator.isNameValid('_abc'), false);
      assert.equal(validator.isNameValid('abc_'), false);
      assert.equal(validator.isNameValid('.abc'), false);
      assert.equal(validator.isNameValid('abc.'), false);
      assert.equal(validator.isNameValid('ab._c'), false);
      assert.equal(validator.isNameValid('ab_.c'), false);
      assert.equal(validator.isNameValid('a___c'), false);
      assert.equal(validator.isNameValid('a...c'), false);
    });

  });

  describe('LoginCredentialsEntity', () => {

    it('Works', () => {
      assert.isOk(new LoginCredentialsEntity({ password: null, email: null }));
    });

    describe('isEmailValid', () => {

      it('works', () => {
        const entity = new LoginCredentialsEntity({ password: null, email: 'my-mail' });
        entity.validator.isEmailValid = sinon.fake.returns(true);

        const result = entity.isEmailValid;

        assert.equal(result, true);
        assert.ok(entity.validator.isEmailValid.calledWith('my-mail'));
      });

    });

    describe('isPasswordValid', () => {

      it('works', () => {
        const entity = new LoginCredentialsEntity({ password: 'my-pass', email: null });
        entity.validator.isPasswordValid = sinon.fake.returns(true);

        const result = entity.isPasswordValid;

        assert.equal(result, true);
        assert.ok(entity.validator.isPasswordValid.calledWith('my-pass'));
      });

    });

    describe('isValid', () => {

      it('returns false when password or email are invalid', () => {
        const entity = new LoginCredentialsEntity({ password: null, email: null });
        entity.validator.isPasswordValid = sinon.fake.returns(false);
        entity.validator.isEmailValid = sinon.fake.returns(false);

        assert.equal(entity.isValid, false);

        entity.validator.isEmailValid = sinon.fake.returns(true);

        assert.equal(entity.isValid, false);

        entity.validator.isPasswordValid = sinon.fake.returns(true);
        entity.validator.isEmailValid = sinon.fake.returns(false);

        assert.equal(entity.isValid, false);
      });

      it('returns true when password and email are valid', () => {
        const entity = new LoginCredentialsEntity({ password: null, email: null });
        entity.validator.isPasswordValid = sinon.fake.returns(true);
        entity.validator.isEmailValid = sinon.fake.returns(true);

        assert.equal(entity.isValid, true);
      });

    });

  });

});
