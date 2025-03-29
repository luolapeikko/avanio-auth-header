import {describe, expect, it} from 'vitest';
import {assertAuthHeaderLikeString, AuthHeaderError} from '../src';

describe('AuthHeaderString', () => {
	describe('assertAuthHeaderString', () => {
		it('should validate header', function () {
			expect(() => assertAuthHeaderLikeString('BASIC wekrlkasdflknjasdf')).not.to.throw();
		});
		it('should throw error', function () {
			expect(() => assertAuthHeaderLikeString('asd')).to.throw(AuthHeaderError, '"asd" is not a valid auth header string');
			expect(() => assertAuthHeaderLikeString(undefined)).to.throw(AuthHeaderError, 'undefined is not a valid auth header string');
		});
	});
});
