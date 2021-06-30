import React from 'react';
import _sodium from 'libsodium-wrappers-sumo';
import { ILoginResponse } from '../interfaces/ILoginResponse';

class AuthService {
    getAccessKey = async (username: string, password: Buffer): Promise<string> => {
        await _sodium.ready;
        const sodium = _sodium;

        return new Promise((resolve, reject) => {
            const accessKey: string = sodium
                .crypto_pwhash(
                    64,
                    new Uint8Array(Buffer.from(password)),
                    sodium.crypto_generichash(sodium.crypto_pwhash_SALTBYTES, password.slice(0, 6) + username + 'novelai_data_access_key'),
                    2,
                    2000000,
                    sodium.crypto_pwhash_ALG_ARGON2ID13,
                    'base64',
                )
                .slice(0, 64);

            resolve(accessKey);
        });
    };

    getAccessToken = async (accessKey: string): Promise<string> => {
        return new Promise(resolve => {
            fetch('https://api.novelai.net/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: accessKey,
                }),
            })
                .then(response => response.json())
                .then(response => {
                    resolve(response.accessToken || false);
                });
        });
    };

    login = async (username: string, password: string): Promise<ILoginResponse> => {
        const accessKey: string = await this.getAccessKey(username, Buffer.from(password, 'utf8'));

        return new Promise(resolve => {
            return this.getAccessToken(accessKey).then(response =>
                resolve({
                    accessToken: response,
                    accessKey,
                }),
            );
        });
    };
}

export default AuthService;
