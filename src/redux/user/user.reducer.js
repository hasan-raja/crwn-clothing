import {UserActionTypes} from './user.type';

//Initial State of user obj as null same in react this.state
const INITIAL_STATE = {
    currentUser:null,
}

//action is like current_state
const userReducer =(state = INITIAL_STATE ,action)=> {
    
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload //payload re render the val
            }
                        
        default:
            return state;
            
    }

}

export default userReducer; 