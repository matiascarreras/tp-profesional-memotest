import { takeLatest, call, put } from 'redux-saga/effects'
import * as types from '../constants/actionTypes'
import { memotestSync } from '../sync'

function *getMemotestData(){
	try {
		const response = yield call(memotestSync.getMemotestData)
	
		if(response.error_code === 0) {
			yield put({ 
				type: types.GET_MEMOTEST_DATA_SUCCESS,
				payload: response.payload
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.GET_MEMOTEST_DATA_FAILED,
				payload: response.payload
			})
		}
	}
	catch(error) {
		console.log(error)
	}
}

function *saveMemotestData(){
	try {
		const response = yield call(memotestSync.saveMemotestData)
	
		if(response.error_code === 0) {
			yield put({ 
				type: types.SAVE_MEMOTEST_DATA_SUCCESS,
				payload: response.payload
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.SAVE_MEMOTEST_DATA_FAILED,
				payload: response.payload
			})
		}
	}
	catch(error) {
		console.log(error)
	}
}

function *makeGoogleSearch(action){
	try {
		const response = yield call(memotestSync.makeGoogleSearch, action.search, action.page)
	
		if(response.error_code === 0) {
			yield put({ 
				type: types.MAKE_GOOGLE_SEARCH_SUCCESS,
				images: response.payload.images,
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.MAKE_GOOGLE_SEARCH_FAILED,
				payload: response.payload
			})
		}
	}
	catch(error) {
		console.log(error)
	}
}

function *getJwtToken(){
	try {
		const response = yield call(memotestSync.getJwtToken)
	
		if(response.error_code === 0) {
			yield put({ 
				type: types.GET_TOKEN_SUCCESS,
				payload: response.payload
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.GET_TOKEN_FAILED,
				payload: response.payload
			})
		}
	}
	catch(error) {
		console.log(error)
	}
}

export default [
	takeLatest(types.INITIALIZE_MEMOTEST, getMemotestData),
	takeLatest(types.SAVE_MEMOTEST_DATA, saveMemotestData),
	takeLatest(types.MAKE_GOOGLE_SEARCH, makeGoogleSearch),
	takeLatest(types.GET_TOKEN, getJwtToken),
]