import {describe, expect, it} from 'vitest';
import {assertAuthHeaderType, AuthHeaderError, AuthHeaderTypeEnum, haveAuthHeaderType, isAuthHeaderType} from '../src';

describe('AuthHeaderObject', () => {
	describe('assertAuthHeaderType', () => {
		it('should validate header', function () {
			expect(() => {
				assertAuthHeaderType('BASIC');
			}).not.to.throw();
			expect(() => {
				assertAuthHeaderType('BASIC', AuthHeaderTypeEnum.BASIC);
			}).not.to.throw();
			expect(() => {
				assertAuthHeaderType('BASIC', [AuthHeaderTypeEnum.BASIC]);
			}).not.to.throw();
			expect(() => {
				assertAuthHeaderType('BASIC', new Set([AuthHeaderTypeEnum.BASIC]));
			}).not.to.throw();
		});
		it('should throw error', function () {
			expect(() => {
				assertAuthHeaderType('asd');
			}).to.throw(AuthHeaderError, '"asd" is invalid auth header type');
			expect(() => {
				assertAuthHeaderType(undefined as unknown as string);
			}).to.throw(AuthHeaderError, 'undefined is invalid auth header type');
			expect(() => {
				assertAuthHeaderType('BASIC', AuthHeaderTypeEnum.BEARER);
			}).to.throw(AuthHeaderError, '"BASIC" is not ["BEARER"] auth header type');
			expect(() => {
				assertAuthHeaderType('BASIC', [AuthHeaderTypeEnum.BEARER]);
			}).to.throw(AuthHeaderError, '"BASIC" is not ["BEARER"] auth header type');
			expect(() => {
				assertAuthHeaderType('BASIC', new Set([AuthHeaderTypeEnum.BEARER]));
			}).to.throw(AuthHeaderError, '"BASIC" is not ["BEARER"] auth header type');
		});
	});
	describe('assertAuthHeaderType', () => {
		it('should check header', function () {
			expect(isAuthHeaderType('BASIC')).to.be.eq(true);
			expect(isAuthHeaderType('BASIC', AuthHeaderTypeEnum.BASIC)).to.be.eq(true);
			expect(isAuthHeaderType('SOME_RANDOM')).to.be.eq(false);
			expect(isAuthHeaderType('BASIC', AuthHeaderTypeEnum.BEARER)).to.be.eq(false);
		});
	});
	describe('assertAuthHeaderType', () => {
		it('should validate header', function () {
			expect(haveAuthHeaderType('BASIC')).to.be.eq(true);
		});
		it('should throw error', function () {
			expect(haveAuthHeaderType('asd')).to.be.eq(false);
			expect(haveAuthHeaderType(undefined)).to.be.eq(false);
		});
	});
});
