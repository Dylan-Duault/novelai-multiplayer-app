import { ILoginData } from './ILoginData';
import { IStory } from './IStory';
import { ISettings } from './ISettings';

export interface IUser {
    loginData?: ILoginData;
    stories?: IStory[];
    settings?: ISettings;
}
