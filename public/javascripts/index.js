$(document).ready(function() {
	console.log('Index Page')
	// Logout Procedure
	const logoutProcedure = () => {
		Cookies.remove('username')
		Cookies.remove('password')
		location.href = '/login'
	}

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
	// Create User
	$('button#user-create-submit').on('click', function() {
		const inputUsername = $('#username').val()
		const inputPassword = $('#password').val()
		const inputEmail = $('#email').val()
		axios
			.post('http://localhost:3001/users', {
				username: inputUsername,
				password: inputPassword,
				email: inputEmail
			})
			.then(function(response) {
				console.log(response.status)
				// close modal
				$('#editAndCreateModal').modal('hide')
				// re-fetch users table data
			})
			.catch(function(error) {
				alert(error.response.data)
			})
	})

	// on show bs.modal
	$('#editAndCreateModal').on('show.bs.modal', function(event) {
		const button = $(event.relatedTarget) // Button that triggered the modal
		const isCreate = button.data('action') === 'create' ? true : false
		if (isCreate) {
			// Action: Create
			const modal = $(this)
			modal.find('.modal-title').text('Create User')
			modal.find('.modal-body input').val('')
			modal
				.find('.form-group')
				.eq(0)
				.show()
		} else {
			// Action: Update
			const password = button.data('password')
			const username = button.data('username')
			const email = button.data('email')
			const modal = $(this)
			modal.find('.modal-title').text('Edit User: ' + username)
			modal
				.find('.form-group')
				.eq(0)
				.hide()
			modal.find('.modal-body input#password').val(password)
			modal.find('.modal-body input#email').val(email)
		}
	})
})
