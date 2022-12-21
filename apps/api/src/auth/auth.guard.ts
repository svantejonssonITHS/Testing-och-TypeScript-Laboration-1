// External dependencies
import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Jwt, decode, JwtPayload, verify } from 'jsonwebtoken';
import { JwksClient, SigningKey } from 'jwks-rsa';

// Internal dependencies
import { AUTH0_DOMAIN } from '$src/utils/env';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			let token: string;

			if (context.getType() === 'ws') {
				const handshake: Request = context.switchToWs().getClient().handshake;
				token = handshake.headers['authorization']?.split(' ')[1];
			} else {
				const request: Request = context.switchToHttp().getRequest();
				token = request.headers['authorization']?.split(' ')[1];
			}

			if (!token) throw new Error();

			const client: JwksClient = new JwksClient({
				jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
			});

			const decoded: Jwt = decode(token, { complete: true });

			if (!decoded) throw new Error();

			const key: SigningKey = await client.getSigningKey(decoded.header.kid);

			const verifiedToken: string | JwtPayload = verify(token, key.getPublicKey(), {
				algorithms: ['RS256']
			});

			if (!verifiedToken) throw new Error();
			else return true;
		} catch (error) {
			throw new HttpException('Unauthorized', 401);
		}
	}
}
