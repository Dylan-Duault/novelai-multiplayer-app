import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Grid, Flex, IconButton, Text, Textarea, Button, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import GenerationService from '../services/GenerationService';
import { useRecoilState } from 'recoil';
import { selectUserState } from '../store/User';
import { selectStoryState } from '../store/Story';
import { SettingsIcon } from '@chakra-ui/icons';
import { selectRoomState } from '../store/Room';

const Index = () => {
    const [user, setUser] = useRecoilState(selectUserState);
    const [story, setStory] = useRecoilState(selectStoryState);
    const [room, setRoom] = useRecoilState(selectRoomState);
    const [loading, setLoading] = useState(false);

    const generateText = async (): Promise<string> => {
        return new Promise(resolve => {
            setLoading(true);
            new GenerationService().generateText(story.text, user).then(generatedText => {
                setLoading(false);
                if (generatedText) {
                    setStory({ ...story, text: generatedText });
                    resolve(generatedText);
                }
            });
        });
    };

    return (
        <React.Fragment>
            <Head>
                <title>Multiplayer NovelAI</title>
            </Head>

            <Flex height={'100%'} justifyContent={'center'} flexDir={'column'}>
                <Box flex={1} p={3}>
                    <Textarea
                        value={story.text}
                        onChange={e => setStory({ ...story, text: e.target.value })}
                        overflow={'auto'}
                        resize="none"
                        variant={'unstyled'}
                        height={'100%'}
                        color={'secondary.100'}
                    />
                </Box>
                <Box bg={'primary.700'}>
                    <Flex height={'100%'}>
                        <Box fontSize={'sm'} borderRadius={0} flex={1} p={3} overflow={'auto'} resize="none" height={'100%'} color={'secondary.200'}>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children={<SettingsIcon color="gray.300" />} />
                                <Input value={room.identifier} onChange={e => setRoom({ ...room, identifier: e.target.value })} placeholder="Room Identifier" />
                            </InputGroup>
                        </Box>
                        <Button
                            isLoading={loading}
                            loadingText="AI is thinking"
                            borderRadius={0}
                            height={'100%'}
                            minWidth={'10%'}
                            onClick={() => {
                                generateText();
                            }}
                        >
                            Send
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </React.Fragment>
    );
};

export default Index;
