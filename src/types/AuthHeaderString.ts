import {AuthHeaderError} from '../AuthHeaderError';
import {type AuthHeaderCredentials} from './AuthHeaderCredentials';
import {type AuthHeaderType, haveAuthHeaderType, isAuthHeaderType} from './AuthHeaderType';

/**
 * Authorization header string
 * @since v0.0.1
 */
export type AuthHeaderString = `${AuthHeaderType} ${AuthHeaderCredentials}`;

/**
 * Check if auth header is valid Auth Header string
 * @param {unknown} auth - Authorization header
 * @returns {boolean} if auth is AuthHeaderString
 * @since v0.0.1
 */
export function isAuthHeaderString(auth: unknown): auth is AuthHeaderString {
	return typeof auth === 'string' && isAuthHeaderType(auth.split(' ', 2)[0]);
}

/**
 * Check if is auth header string (case insensitive)
 * @param {unknown} auth - Authorization header
 * @returns {boolean} if auth is AuthHeaderString
 * @since v0.0.1
 */
export function haveAuthHeaderString(auth: unknown): boolean {
	return typeof auth === 'string' && haveAuthHeaderType(auth.split(' ', 2)[0]);
}

/**
 * Assert value is valid AuthHeaderString
 * @param {unknown} value The value to be asserted as a valid AuthHeaderString
 * @throws {AuthHeaderError} If the value is not a valid AuthHeaderString
 * @since v0.0.1
 */
export function assertAuthHeaderString(value: unknown): asserts value is AuthHeaderString {
	if (typeof value !== 'string') {
		throw new AuthHeaderError(`${JSON.stringify(value)} is not a valid auth header type`);
	}
	const type = value.split(' ', 2)[0];
	if (!isAuthHeaderType(type)) {
		throw new AuthHeaderError(`${type} is not a valid auth header type`);
	}
}
