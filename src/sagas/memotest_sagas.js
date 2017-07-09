import { takeLatest, call, put } from 'redux-saga/effects'
import * as types from '../constants/actionTypes'
import { memotestSync } from '../sync'

function *getMemotestData(action){
	try {
		const response = yield call(memotestSync.getMemotestData, action.id, action.jwt)
	
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
		const response = yield call(memotestSync.saveMemotestData, action.presentationId, action.completed, action.title, action.data_all, action.data_teacher, action.jwt)
	
		if(response.error_code === 0) {
			yield put({ 
				type: types.SAVE_MEMOTEST_DATA_SUCCESS,
				payload: response.payload,
				returnUrl: action.returnUrl
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
		const response = yield call(memotestSync.makeGoogleSearch, action.search, action.page, action.jwt)

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

function *updateMemotestData(action){
	try {
		const response = yield call(memotestSync.updateMemotestData, action.presentationId, action.completed, action.title, action.data_all, action.data_teacher, action.jwt, action.slideId)
	
		if(response.error_code === 0) {
			yield put({ 
				type: types.UPDATE_MEMOTEST_DATA_SUCCESS,
				payload: response.payload,
				returnUrl: action.returnUrl
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.UPDATE_MEMOTEST_DATA_FAILED,
				payload: response.payload
			})
		}
	}
	catch(error) {
		console.log(error)
	}
}

function *saveStudentResponse(action){
	try {
		const response = yield call(memotestSync.saveStudentResponse, action.responseText, action.response, action.jwt)
		if(response.error_code === 0) {
			yield put({ 
				type: types.SAVE_STUDENT_RESPONSE_SUCCESS,
				payload: response.payload
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.SAVE_STUDENT_RESPONSE_FAILED,
				payload: response.payload
			})
		}
	}
	catch(error) {
		console.log(error)
	}
}

function *getStudentResponses(action){
	try {
		const response = yield call(memotestSync.getStudentResponses, action.jwt)
		if(response.error_code === 0) {
			yield put({ 
				type: types.GET_STUDENT_RESPONSES_SUCCESS,
				payload: response.payload
			})
		} else if(response.error_code === 1){
			yield put({ 
				type: types.GET_STUDENT_RESPONSES_FAILED,
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
	takeLatest(types.UPDATE_MEMOTEST_DATA, updateMemotestData),
	takeLatest(types.SAVE_STUDENT_RESPONSE, saveStudentResponse),
	takeLatest(types.GET_STUDENT_RESPONSES, getStudentResponses),
]