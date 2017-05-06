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

function getMemotestData(id) {
	return http_agent.get('http://ct.api.com/v1/ct/custom_slides')
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

function saveMemotestData(presentationId, completed, title, data_all, data_teacher) {
	return http_agent.post('http://ct.api.com/v1/ct/custom_slides')
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

function makeGoogleSearch(search, page) {
	return http_agent.get('http://ct.api.com/v1/ct/google_images?q='+search+'&page='+page)
	.set('x-api-key', '7dabac64681a7c12c1cb97183c44de93')
	.set('JWT', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDVCIsImV4cCI6MzYzOTk0NTE2OCwiYXVkIjoiN2RhYmFjNjQ2ODFhN2MxMmMxY2I5NzE4M2M0NGRlOTMiLCJyZWZyZXNoIjoyMTQ3NDgzNjQ3LCJ1aWQiOiIiLCJpYXQiOjE0OTI0NjE1MjEsImlkIjoxNTQ5NSwiZW52IjoiaHR0cDpcL1wvMTg0LmN0LnBzZi1pdC5jb20uYXJcLyJ9.iWFf3TzR7uy3iG9bsZVHAjQ5mcQr8XVIsJrZqE0-Ja0')
	.send({})
	.withCredentials()
	.use(superagentPromisePlugin)
	.then(function(response) {
		let payload = JSON.parse(response.text)
		return payload
	})
	.catch(err => _genericCatch(err))
}

function getJwtToken(appUid, deviceUid, id, slide, isTeacher, token) {
	return http_agent.get('http://ct.api.com/v1/ct/token?app_uid='+appUid+'&device_uid='+deviceUid+'&custom_slide_id='+id+'&slide='+slide+'&is_teacher='+isTeacher+'&token='+token)
	.send({})
	.withCredentials()
	.use(superagentPromisePlugin)
	.then(function(response) {
		let payload = JSON.parse(response.text)
		return payload
	})
	.catch(err => _genericCatch(err))
}

export default {
	getMemotestData,
	saveMemotestData,
	makeGoogleSearch,
	getJwtToken
}