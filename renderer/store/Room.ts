import { atom } from 'recoil';
import { IRoom } from '../interfaces/IRoom';

const room: IRoom = {
    identifier: '',
};

export const selectRoomState = atom({
    key: 'selectRoomState',
    default: room,
});
