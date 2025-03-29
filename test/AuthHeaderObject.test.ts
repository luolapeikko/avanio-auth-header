import {describe, expect, it} from 'vitest';
import {assertAuthHeaderObject, AuthHeaderError} from '../src';

describe('AuthHeaderObject', () => {
	describe('assertAuthHeaderString', () => {
		it('should validate header', function () {
			expect(() => assertAuthHeaderObject({type: 'BASIC', credentials: 'asd'})).not.throw();
		});
		it('should throw error', function () {
			expect(() => assertAuthHeaderObject('asd')).to.throw(AuthHeaderError, '"asd" is invalid auth header object');
			expect(() => assertAuthHeaderObject(undefined as unknown as string)).to.throw(AuthHeaderError, 'undefined is invalid auth header object');
		});
	});
});
