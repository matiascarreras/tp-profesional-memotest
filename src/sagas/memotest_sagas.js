import { takeLatest, call, put } from 'redux-saga/effects'
import * as types from '../constants/actionTypes'
import { memotestSync } from '../sync'

function *getMemotestData(action){
	try {
		const response = yield call(memotestSync.getMemotestData, action.id)
	
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

function *saveMemotestData(action){
	try {
		debugger
		const response = yield call(memotestSync.saveMemotestData, action.presentationId, action.completed, action.title, action.data_all, action.data_teacher)
	
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
				images: response.payload.images.data,
				showMore: response.payload.images.showMore
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

function *getGoogleDriveDownloadLink(action){
	try {
		const response = yield call(memotestSync.getGoogleDriveDownloadLink, action.fileId, action.token)
		if(response.statusCode === 200) {
			let fileArray = []
		    fileArray.push({
		        size: response.body.fileSize,
		        name: response.body.title,
		        link: response.body.webContentLink
		    })
			yield put({ 
				type: types.SAVE_UPLOADERS_FILES,
				uploaderFiles: fileArray
			})
		} else {
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
	takeLatest(types.GET_GOOGLE_DRIVE_DOWNLOAD_LINK, getGoogleDriveDownloadLink),
]