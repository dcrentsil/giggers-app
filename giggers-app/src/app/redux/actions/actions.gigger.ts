import { Action } from '@ngrx/store';
import { Gigger } from '../../models/giggers';
import { IGiggers } from '../interfaces/giggers.interface';

export interface PayloadAction extends Action {payload: any};

export const GIGGER_DETAILS= 'GIGGER_DETAILS';
export const ADD_GIGGER = 'ADD_GIGGER';
// export const SELECT_GIGGER = 'SELECT_GIGGER';
export const REMOVE_GIGGER = 'Remove_GIGGER';
// export const SEARCH_GIGGER = 'SEARCH_GIGGER';
// export const UPDATE_GIGGER = 'UPDATE_GIGGER';
// export const ADD_ERROR =  'ADD_ERROR';
// export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOAD_GIGGERS = 'LOAD_GIGGER';
export const ADD_GIGGER_COMPLETED = 'ADD_GIGGER_COMPLETED';
export const ADD_GIGGER_FAILED = 'ADD_GIGGER_FAILED';
export const LOAD_GIGGERS_COMPLETED = 'LOAD_GIGGERS_COMPLETED';
export const LOAD_GIGGERS_FAILED = 'LOAD_GIGGERS_FAILED';


export const addgigger = (data: Gigger): PayloadAction => {
	return {
        type: ADD_GIGGER,
        payload: data
	};
};

export const addgiggerCompleted = (): Action => {
	return {
		type: ADD_GIGGER_COMPLETED
	};
};

export const addgiggerFailed = (): Action => {
	return {
		type: ADD_GIGGER_FAILED
	};
};

export const removegigger = (data: Gigger): PayloadAction => {
	return {
		type: REMOVE_GIGGER,
		payload: data
	};
};

export const loadgiggers = () : Action => {
	return {
		type: LOAD_GIGGERS
	};
};

export const loadgiggerscompleted = (data: Gigger): PayloadAction => {
	return {
		type: LOAD_GIGGERS_COMPLETED,
		payload: data
	};
};

export const loadgiggersfailed = (): Action => {
	return {
		type: LOAD_GIGGERS_FAILED
	};
};

export const giggerdetails = (giggers: IGiggers): PayloadAction => {
	return {
		type: GIGGER_DETAILS,
		payload: {
			giggers: giggers,
		}
	}
}