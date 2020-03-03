import {
    REQUEST_PRINT_LIST, REQUEST_PRINT_LIST_SUCCEED, REQUEST_PRINT_LIST_FAILED
} from './../actions';

const initialState = {
    byPage: {},
    totalPrints: 0,
    totaPpages: 0,
    isPageFetching: {}
}

export function prints(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PRINT_LIST: {
            const newState = Object.assign({}, state);
            newState.isPageFetching[action.page] = true;
            return newState;
        }
        case REQUEST_PRINT_LIST_SUCCEED: {
            console.log("action", action);
            const newState = Object.assign({}, state);
            newState.isPageFetching[action.page] = false;
            newState.totalPrints = action.printList.totalPrints;
            newState.totaPpages = action.printList.pages;
            newState.byPage[action.page] = action.printList.Prints;

            return newState;
        }
        case REQUEST_PRINT_LIST_FAILED: {
            const newState = Object.assign({}, state);
            newState.isPageFetching[action.page] = false;

            return newState;
        }
        default:
            return state;
    }
}