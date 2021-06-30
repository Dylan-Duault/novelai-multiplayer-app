import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Flex, IconButton, Text, Stack, Input, Button } from '@chakra-ui/react';
import Logo from '../components/svg/logo';
import AuthService from '../services/AuthService';
import { selectUserState } from '../store/User';
import { useRecoilState } from 'recoil';
import { IUser } from '../interfaces/IUser';
import { useRouter } from 'next/router';

const Index = () => {
    const [user, setUser] = useRecoilState(selectUserState);
    const [errorMessage, setErrorMessage] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const login = () => {
        new AuthService().login(username, password).then(loginResponse => {
            if (!loginResponse.accessToken) {
                return setErrorMessage('Connection failed');
            }

            setErrorMessage(null);
            const initializedUser: IUser = {
                loginData: {
                    accessToken: loginResponse.accessToken,
                    accessKey: loginResponse.accessKey,
                },
            };
            setUser(initializedUser);

            router.replace('/home');
        });
    };

    const handleKeypress = e => {
        if (e.code === 'Enter') {
            login();
        }
    };

    return (
        <React.Fragment>
            <Head>
                <title>Multiplayer NovelAI</title>
            </Head>

            <Flex height={'100%'} alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
                <Box borderRadius={15} minWidth={500} width={'70%'} p={10} bg={'secondary.700'}>
                    <Flex height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
                        <Box fill={'primary.100'} pb={50} width={'50%'}>
                            <IconButton variant={'none'} isRound={false} aria-label="Logo" as={Logo} padding="8px" borderRadius="5px" borderStyle="solid" borderWidth="2px" />
                        </Box>

                        <Stack spacing={5} width={'100%'} onKeyPress={handleKeypress}>
                            <Input isInvalid={errorMessage} type="email" placeholder="Email Address" onChange={e => setUsername(e.target.value)} />
                            <Input isInvalid={errorMessage} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            <Button bg={'primary.100'} onClick={() => login()}>
                                <Text>Login</Text>
                            </Button>
                            <Text color={'red.500'}>{errorMessage}</Text>
                        </Stack>
                    </Flex>
                </Box>
            </Flex>
        </React.Fragment>
    );
};

export default Index;
