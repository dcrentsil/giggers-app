import { Action } from '@ngrx/store';
import { IGiggers } from '../interfaces/giggers.interface';
import * as GiggerActions from '../actions/actions.gigger';
import { PayloadAction } from '../actions/actions.gigger';


const initialGigger: IGiggers = {
    type: '',
    name: '',
    username: '',
    speciality: '',
    description : '',
    addgiggersInProgress: false,
    addgiggersFailed: false
};


export function giggerReducer(state: IGiggers = initialGigger, action: PayloadAction): IGiggers {
    switch(action.type) {
        
        case GiggerActions.GIGGER_DETAILS:
        return Object.assign({}, state, action.payload);

        case GiggerActions.ADD_GIGGER:
            return Object.assign({}, state,action.payload, {
            addgiggersInProgress: true
            });
            

        case GiggerActions.ADD_GIGGER_COMPLETED:
            return Object.assign({}, state, {
                addgiggersInProgress: false,
                addgiggersFailed: false
            });

        case GiggerActions.ADD_GIGGER_FAILED:
        return Object.assign({}, state, {
            addgiggersInProgress: false,
            addgiggersFailed: true
        }); 
        
        case GiggerActions.REMOVE_GIGGER:
        return Object.assign({}, state, !action.payload);
            
        
        case GiggerActions.LOAD_GIGGERS:
        return Object.assign({}, state, action.payload);

        case GiggerActions.LOAD_GIGGERS_COMPLETED:
        return Object.assign({}, state, {
        });


       default:
            return state;
    }
}