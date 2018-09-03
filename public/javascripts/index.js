const hostname = 'localhost:3001' // localhost:3333  <- export docker port

$(document).ready(function() {
	// Logout Procedure
	const logoutProcedure = () => {
		Cookies.remove('username')
		Cookies.remove('password')
		location.href = '/login'
	}

	// Page Init Procedure
	const pageInit = (() => {
		const adminName = Cookies.get('username')
		$('.header .name').text(adminName)
	})()

	// Cookie on change listener
	const checkCookie = (() => {
		var lastCookie = document.cookie
		return () => {
			const currentCookie = document.cookie
			if (lastCookie !== currentCookie) {
				// update
				lastCookie = currentCookie

				// logout & redirect
				logoutProcedure()
			}
		}
	})()
	window.setInterval(checkCookie, 500)

	// Logout Btn
	$('.logout-btn').on('click', function() {
		logoutProcedure()
	})

	/* User Actions */
	// Get Users List
	const getUsers = () => {
		return axios
			.get('/users')
			.then(function(response) {
				// handle success
				$('table.user-table tbody').html(response.data)
			})
			.catch(function(error) {
				// handle error
				console.log(error)
			})
			.then(function() {
				// always executed
			})
	}
	getUsers()

	// Validate
	const validateObj = {
		email: email => {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			return re.test(String(email).toLowerCase())
				? ''
				: 'The Email format is incorrect!'
		}
	}

	// Create User
	$('button#user-create-submit').on('click', function() {
		const inputUsername = $('#username').val()
		const inputPassword = $('#password').val()
		const inputEmail = $('#email').val()

		// validate
		const emailErrorText = validateObj.email(inputEmail)
		if (emailErrorText) {
			const errorEl = $(`<div class='error-msg'>${emailErrorText}</div>`)
			$('#email')
				.parent()
				.append(errorEl)
			return
		}

		// send request
		axios
			.post(`http://${hostname}/users`, {
				username: inputUsername,
				password: inputPassword,
				email: inputEmail
			})
			.then(function(response) {
				$('#editAndCreateModal').modal('hide')
				getUsers()
			})
			.catch(function(error) {
				alert(error.response.data)
			})
	})

	// Edit User
	$('button#user-edit-submit').on('click', function(e) {
		const inputPassword = $('#password').val()
		const inputEmail = $('#email').val()
		const userId = e.target.dataset.id

		// validate
		const emailErrorText = validateObj.email(inputEmail)
		if (emailErrorText) {
			const errorEl = $(`<div class='error-msg'>${emailErrorText}</div>`)
			$('#email')
				.parent()
				.append(errorEl)
			return
		}

		// send request
		axios
			.put(`http://${hostname}/users/${userId}`, {
				password: inputPassword,
				email: inputEmail
			})
			.then(function(response) {
				$('#editAndCreateModal').modal('hide')
				getUsers()
			})
			.catch(function(error) {
				alert(error.response.data)
			})
	})

	// Delete A User
	$('.user-table').on('click', '.delete-user-btn', function(e) {
		const userId = e.target.dataset.id
		axios
			.delete(`http://${hostname}/users/${userId}`)
			.then(function(response) {
				console.log(response.status)
				// re-fetch users table data
				getUsers()
			})
			.catch(function(error) {
				alert(error.response.data)
			})
	})

	// On show bs.modal
	$('#editAndCreateModal').on('show.bs.modal', function(event) {
		const button = $(event.relatedTarget) // Button that triggered the modal
		const isCreate = button.data('action') === 'create' ? true : false
		if (isCreate) {
			// Action: Create
			const modal = $(this)
			modal.find('.modal-title').text('Create User')
			modal.find('button#user-create-submit').show()
			modal.find('button#user-edit-submit').hide()
			modal.find('.modal-body input').val('')
			modal
				.find('.form-group')
				.eq(0)
				.show()
		} else {
			// Action: Update
			const username = button.data('username')
			const password = button.data('password')
			const email = button.data('email')
			const userId = button.data('id')
			const modal = $(this)
			modal.find('.modal-title').text('Edit User: ' + username)
			modal.find('button#user-create-submit').hide()
			modal.find('button#user-edit-submit').show()
			// assign user id to submit btn
			document
				.querySelector('#user-edit-submit')
				.setAttribute('data-id', userId)

			modal
				.find('.form-group')
				.eq(0)
				.hide()
			modal.find('.modal-body input#password').val(password)
			modal.find('.modal-body input#email').val(email)
		}
	})

	// On hide bs.modal
	$('#editAndCreateModal').on('hide.bs.modal', function(event) {
		// Reset Modal Process
		$('.error-msg').remove()
	})
})
