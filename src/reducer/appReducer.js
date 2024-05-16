
export const appReducer = (state,action) => {
    switch(action.type){
        case 'AUTH' :
            state={
                ...state,
                isLoggedIn:action.payload
            }
            break;
            case 'USER_INFO' :
                state={
                    ...state,
                    userInfo:{
                        ...state.userInfo,
                        ...action.payload
                    }
                }
                break;
    }
    return state;
}