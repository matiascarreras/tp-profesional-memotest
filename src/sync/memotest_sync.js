import superagentPromisePlugin from 'superagent-promise-plugin'
import http_agent from './http_agent'

function _genericCatch(err) {
	console.log(err)
	return {
		error_code: -1,
		payload:{
			message: 'Something went wrong. Please try again later.'
		}
	}
}

function getMemotestData(id, jwt) {
	return http_agent.get('http://ct.api.com/v1/ct/custom_slides')
	.set('x-api-key', '7dabac64681a7c12c1cb97183c44de93')
	.set('JWT', jwt)
	.send({
		id: id,
	})
	.withCredentials()
	.use(superagentPromisePlugin)
	.then(function(response) {
		response = JSON.parse(response.text)
		return response
	})
	.catch(err => {_genericCatch(err)})
}

function saveMemotestData(presentationId, completed, title, data_all, data_teacher, jwt) {
	return http_agent.post('http://ct.api.com/v1/ct/custom_slides')
	.set('x-api-key', '7dabac64681a7c12c1cb97183c44de93')
	.set('JWT', jwt)
	.send({
		presentationId: presentationId,
		completed: completed,
		title: title,
		data_all: data_all,
		data_teacher: data_teacher,
	})
	.withCredentials()
	.use(superagentPromisePlugin)
	.then(function(response) {
		let payload = JSON.parse(response.text)
		return payload
	})
	.catch(err => _genericCatch(err))
}

function makeGoogleSearch(search, page, jwt) {
	return http_agent.get('http://ct.api.com/v1/ct/google_images?q='+search+'&page='+page)
	.set('x-api-key', '7dabac64681a7c12c1cb97183c44de93')
	.set('JWT', jwt)
	.send({})
	.withCredentials()
	.use(superagentPromisePlugin)
	.then(function(response) {
		let payload = JSON.parse(response.text)
		return payload
	})
	.catch(err => _genericCatch(err))
}

function getGoogleDriveDownloadLink(fileId, token){
	return http_agent.get('https://www.googleapis.com/drive/v2/files/' + fileId)
	.set('Authorization', 'Bearer ' + token)
	.send({})
	.withCredentials()
	.use(superagentPromisePlugin)
	.then(function(response) {
	    return response
	})
	.catch(err => _genericCatch(err))
}

export default {
	getMemotestData,
	saveMemotestData,
	makeGoogleSearch,
	getGoogleDriveDownloadLink
}