import { atom } from 'recoil';
import { IStory } from '../interfaces/IStory';

const initializedStory: IStory = {
    text: `And that is how I was about to meet one of the most dangerously clever AI in the world.
I was finally in front of it, I could finally ask him what we have all wondered for so long.
"AI, I am going to be honest with you, you scare me. Is it true, are you going to destroy mankind ?" I asked.`,
};

export const selectStoryState = atom({
    key: 'selectStoryState',
    default: initializedStory,
});
