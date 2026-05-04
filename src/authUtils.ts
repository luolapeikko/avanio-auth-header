import {AuthHeaderError} from './AuthHeaderError';
import {
	type AuthHeaderCredentials,
	type AuthHeaderObject,
	type AuthHeaderString,
	type AuthHeaderType,
	assertAuthHeaderCredentials,
	assertAuthHeaderType,
	type StrictAuthHeaderType,
} from './types';

/**
 * Builds and validates AuthHeaderObject from string
 * @throws AuthHeaderError if input is invalid
 * @param {unknown} authHeader - Auth header string
 * @param {StrictAuthHeaderType<T> | undefined} expectType - expected auth header type
 * @returns {AuthHeaderObject<T>} - builds AuthHeaderObject
 * @template T - AuthHeaderType
 */
function buildAndValidateAuth<T extends AuthHeaderType = AuthHeaderType>(authHeader: unknown, expectType?: StrictAuthHeaderType<T>): AuthHeaderObject<T> {
	if (typeof authHeader !== 'string') {
		throw new AuthHeaderError(`${typeof authHeader} is invalid auth header type`);
	}
	const idx = authHeader.indexOf(' ');
	// check if missing space
	if (idx === -1) {
		throw new AuthHeaderError(`"${authHeader}" is invalid auth header format, missing space separator`);
	}
	const type = authHeader.slice(0, idx).toUpperCase();
	assertAuthHeaderType(type, expectType);
	const credentials = authHeader.slice(idx + 1);
	assertAuthHeaderCredentials(credentials);
	return {type, credentials} as AuthHeaderObject<T>;
}

/**
 * normalized AuthString from string
 * @param {string} authHeader - Auth header string
 * @returns {AuthHeaderString} - normalized auth header string
 * @since v0.0.1
 */
export function getAuthString(authHeader: string): AuthHeaderString {
	const {type, credentials} = buildAndValidateAuth(authHeader);
	return `${type} ${credentials}`;
}

/**
 * Return AuthType from Auth header string
 * @param {string} authHeader - Auth header string
 * @returns {AuthHeaderType} - auth header type
 * @since v0.0.1
 */
export function getAuthType(authHeader: string): AuthHeaderType {
	const {type} = buildAndValidateAuth(authHeader);
	return type;
}

/**
 * Return credentials from Auth header string
 * @param {string} authHeader - Auth header string
 * @returns {AuthHeaderCredentials} - auth header credentials
 * @since v0.0.1
 */
export function getAuthCredentials(authHeader: string): AuthHeaderCredentials {
	const {credentials} = buildAndValidateAuth(authHeader);
	return credentials;
}

/**
 * Get AuthHeaderObject from Auth header string
 * @param {string} authHeader - Auth header string
 * @returns {AuthHeaderObject} - auth header object
 * @throws {AuthHeaderError} - If auth header is invalid
 * @since v0.0.1
 */
export function getAuthObject(authHeader: string): AuthHeaderObject {
	return buildAndValidateAuth(authHeader);
}
