import { combineReducers } from "redux";
import { prints } from './prints';

const printsReducers = combineReducers({
    prints,
});
export const Prints = printsReducers;
export * from './prints';
