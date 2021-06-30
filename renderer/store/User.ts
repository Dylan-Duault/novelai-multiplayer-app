import { atom } from 'recoil';
import { IUser } from '../interfaces/IUser';

const initializedUser: IUser = {};

export const selectUserState = atom({
    key: 'selectUserState',
    default: initializedUser,
});
