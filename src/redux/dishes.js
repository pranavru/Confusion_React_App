import { DISHES } from '../shared/dishes';

export const Dishes = ( state = DISHES, action) => {
    switch(action.types) {
        default:
            return state;
    }
};