import { takeLatest, call, put, select } from 'redux-saga/effects'
import * as types from '../constants/actionTypes'
import { memotestSync } from '../sync'
import searchPanelGoogleSelector from '../selectors/search_panel_google_selector'

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
		const searchPanelGoogleData = yield select(searchPanelGoogleSelector)
		let imagesArray = []
		const response = ""
		
		response = yield call(memotestSync.makeGoogleSearch, action.search, action.page)

		imagesArray.push(response.payload.images.data)

		if(imagesArray.length <= 10){
			response = yield call(memotestSync.makeGoogleSearch, action.search, action.page)
			imagesArray.push(response.payload.images.data)
			if(response.error_code === 0) {
				yield put({ 
					type: types.MAKE_GOOGLE_SEARCH_SUCCESS,
					images: imagesArray,
					showMore: response.payload.images.showMore
				})
			} else if(response.error_code === 1){
				yield put({ 
					type: types.MAKE_GOOGLE_SEARCH_FAILED,
					payload: response.payload
				})
			}
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

function *getGoogleDriveDownloadLink(action){
	try {
		const response = yield call(memotestSync.getGoogleDriveDownloadLink, action.fileId, action.token)
	
		if(response.error_code === 0) {
			yield put({ 
				type: types.GET_GOOGLE_DRIVE_DOWNLOAD_LINK_SUCCESS,
				fileData: response.payload
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.GET_GOOGLE_DRIVE_DOWNLOAD_LINK_FAILED,
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
	takeLatest(types.GET_GOOGLE_DRIVE_DOWNLOAD_LINK, getGoogleDriveDownloadLink),
]