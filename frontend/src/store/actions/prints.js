import { PrintsService } from "./../../services/prints";


export const REQUEST_PRINT_LIST = 'REQUEST_PRINT_LIST';
function requestPrintList(page) {
    return {
        type: REQUEST_PRINT_LIST,
        page
    }
}

export const REQUEST_PRINT_LIST_SUCCEED = 'REQUEST_PRINT_LIST_SUCCEED';
function requestPrintListSucceed(printList, page) {
    return {
        type: REQUEST_PRINT_LIST_SUCCEED,
        printList,
        page
    }
}

export const REQUEST_PRINT_LIST_FAILED = 'REQUEST_PRINT_LIST_FAILED';
function requestPrintListFailed(error, page) {
    return {
        type: REQUEST_PRINT_LIST_FAILED,
        page,
        error
    }
}

// fetchPrint
export function fetchPrintList(page) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            dispatch(requestPrintList(page));
            try {
                const printAnswer = (await PrintsService.getPrints(page)).data.getPrints;
                dispatch(requestPrintListSucceed(printAnswer, page));
                resolve(printAnswer);
            } catch (e) {
                dispatch(requestPrintListFailed(e, page));
                reject(e);
            }
        });
    }
}

// check if the print is already stored, or if it is in progress or failed
function shouldFetchPrintList(state, page) {
    return page && !state.prints.byPage[page];
}

// check if the print page is already stored, fetch it if not
export function fetchPrintListIfNeeded(page) {
    return async (dispatch, getState) => {
        if (shouldFetchPrintList(getState(), page)) {
            // Dispatch a thunk from thunk!
            dispatch(fetchPrintList(page));
        }
    }
}
