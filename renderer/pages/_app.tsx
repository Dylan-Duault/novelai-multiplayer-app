import { Box, ChakraProvider, ColorModeScript, Flex, Text } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import SocketIO from '../components/socket';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <RecoilRoot>
                <SocketIO />
                <Box position={'fixed'} height={'100%'} width={'100%'}>
                    <Component {...pageProps} />
                </Box>
            </RecoilRoot>
        </ChakraProvider>
    );
}

export default MyApp;
