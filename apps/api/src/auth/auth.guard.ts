/* eslint-disable @typescript-eslint/typedef */
// External dependencies
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Jwt, decode, JwtPayload, verify } from 'jsonwebtoken';
import { JwksClient, SigningKey } from 'jwks-rsa';

// Internal dependencies
import { AUTH0_DOMAIN } from '$src/utils/env';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request: Request = context.switchToHttp().getRequest();

			const token: string = request.headers['authorization']?.split(' ')[1];

			if (!token) return false;

			const client: JwksClient = new JwksClient({
				jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
			});

			const decoded: Jwt = decode(token, { complete: true });

			if (!decoded) return false;

			const key: SigningKey = await client.getSigningKey(decoded.header.kid);

			const verifiedToken: string | JwtPayload = verify(token, key.getPublicKey(), {
				algorithms: ['RS256']
			});

			return !!verifiedToken;
		} catch (error) {
			return false;
		}
	}
}
