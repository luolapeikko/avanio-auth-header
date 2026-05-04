import {getAuthObject} from './authUtils';
import type {AuthHeaderCredentials, AuthHeaderObject, AuthHeaderString, AuthHeaderType} from './types';

/**
 * AuthHeader class
 * @since v0.0.1
 */
export class AuthHeader implements AuthHeaderObject {
	public static fromString(auth: string): AuthHeader {
		return new AuthHeader(auth);
	}

	public readonly type: AuthHeaderType;
	public readonly credentials: AuthHeaderCredentials;

	protected constructor(auth: string) {
		const {type, credentials} = getAuthObject(auth);
		this.type = type;
		this.credentials = credentials;
	}

	/**
	 * @returns {AuthHeaderString} - auth string
	 */
	public toString(): AuthHeaderString {
		return `${this.type} ${this.credentials}`;
	}

	/**
	 * @returns {AuthHeaderObject} - auth object
	 */
	public toJSON(): AuthHeaderObject {
		return {type: this.type, credentials: this.credentials};
	}
}
