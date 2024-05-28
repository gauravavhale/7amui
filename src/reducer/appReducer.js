
export const appReducer = (state,action) => {
    switch(action.type){
        case 'AUTH' :
            state={
                ...state,
                isLoggedIn:action.payload.isLoggedIn,
                userInfo:action.payload.userInfo
            }
            break;
            case 'LOADER':
                state={
                    ...state,
                    isShowLoader:action.payload
                }
                break;
    }
    return state;
}