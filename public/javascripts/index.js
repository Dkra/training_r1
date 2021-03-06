const hostname = '' // localhost:3333  <- export docker port

$(document).ready(function() {
	// Logout Procedure
	const logoutProcedure = () => {
		axios
			.get('/api/logout')
			.then(function(response) {
				// handle success
				location.href = '/login'
			})
			.catch(function(error) {
				// handle error
				console.log(error)
			})
			.then(function() {
				// always executed
			})
	}

	// Logout Btn
	$('.logout-btn').on('click', function() {
		logoutProcedure()
	})

	/* User Actions */
	// Get Users List
	const getUsers = () => {
		return axios
			.get('/api/users')
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

	// Get File List
	const getFiles = () => {
		return axios
			.get('/api/files')
			.then(function(response) {
				// handle success
				$('table.file-table tbody').html(response.data)
			})
			.catch(function(error) {
				// handle error
				console.log(error)
			})
			.then(function() {
				// always executed
			})
	}
	getFiles()

	// Validate
	const validateObj = {
		email: email => {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			return re.test(String(email).toLowerCase())
				? ''
				: 'The Email format is incorrect!'
		},
		confirmPassword: (password0, password1) => {
			return password0 === password1
				? ''
				: 'The password and confirm password field is not match!'
		}
	}

	// Create User
	$('button#user-create-submit').on('click', function() {
		const inputUsername = $('#username').val()
		const inputPassword = $('#password').val()
		const inputConfirmPassword = $('#confirm-password').val()
		const inputEmail = $('#email').val()

		// Validate
		// prepare start validate
		$('.error-msg').remove()

		// Validating
		const emailErrorText = validateObj.email(inputEmail)
		if (emailErrorText) {
			const errorEl = $(`<div class='error-msg'>${emailErrorText}</div>`)
			$('#email')
				.parent()
				.append(errorEl)
		}

		const confirmPasswordText = validateObj.confirmPassword(
			inputPassword,
			inputConfirmPassword
		)
		if (confirmPasswordText) {
			const errorEl = $(`<div class='error-msg'>${confirmPasswordText}</div>`)
			$('#confirm-password')
				.parent()
				.append(errorEl)
		}

		// After validate ( stop if any error occurs )
		if (emailErrorText || confirmPasswordText) return

		// send request
		axios
			.post(`api${hostname}/users`, {
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
		const inputConfirmPassword = $('#confirm-password').val()
		const userId = e.target.dataset.id

		// Validate
		// prepare start validate
		$('.error-msg').remove()

		// Validating
		const emailErrorText = validateObj.email(inputEmail)
		if (emailErrorText) {
			const errorEl = $(`<div class='error-msg'>${emailErrorText}</div>`)
			$('#email')
				.parent()
				.append(errorEl)
		}

		const confirmPasswordText = validateObj.confirmPassword(
			inputPassword,
			inputConfirmPassword
		)
		if (confirmPasswordText) {
			const errorEl = $(`<div class='error-msg'>${confirmPasswordText}</div>`)
			$('#confirm-password')
				.parent()
				.append(errorEl)
		}

		// After validate ( stop if any error occurs )
		if (emailErrorText || confirmPasswordText) return

		// send request
		axios
			.put(`${hostname}api/users/${userId}`, {
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
	$('#user-delete-submit').on('click', function(e) {
		const userId = e.target.dataset.id
		axios
			.delete(`${hostname}api/users/${userId}`)
			.then(function(response) {
				$('#deleteUserModal').modal('hide')
				// re-fetch users table data
				getUsers()
			})
			.catch(function(error) {
				alert(error.response.data)
			})
	})

	// On show bs.modal ( Delete User )
	$('#deleteUserModal').on('show.bs.modal', function(event) {
		const button = $(event.relatedTarget)
		const username = button.data('username')
		const userId = button.data('id')
		const email = button.data('email')
		const modal = $(this)
		modal
			.find('.modal-title')
			.html(`Delete User: ${username}<br> (Email:${email})`)
		// assign user id to submit btn
		document
			.querySelector('#user-delete-submit')
			.setAttribute('data-id', userId)
	})

	// On show bs.modal ( Create / Edit User )
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
			modal.find('.modal-body input#email').val(email)
		}
	})

	// On hide bs.modal
	$('#editAndCreateModal').on('hide.bs.modal', function(event) {
		// Reset Modal Process
		$('.error-msg').remove()
	})

	// On Tab Active
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(event) {
		event.target // newly activated tab
		const isFileTabActive = $(event.target).text() === 'Files' ? true : false

		if (isFileTabActive) {
			getFiles()
		}
	})

	// File Submit
	$('#upload-form').on('submit', function(event) {
		event.preventDefault()
		const $form = $(this)
		// const $fileInput = $form.find('input[type=file]')
		// const file = $fileInput[0].files
		const $file = document.querySelector('#file-input')

		// Check isEmpty
		if ($file.files.length === 0) {
			alert('No File Selected!')
			return
		}
		var formData = new FormData()
		formData.append('file', $file.files[0])

		// send request
		axios
			.post(`${hostname}api/files`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
			.then(function(response) {
				console.log('response:', response)
				alert('Successful upload file!')
				// Reset  input
				$file.value = ''
				// get file lists
				getFiles()
			})
			.catch(function(error) {
				alert(error.response.data)
			})
	})

	// Delete A File
	$('#file-delete-submit').on('click', function(e) {
		const filename = e.target.dataset.filename
		axios
			.delete(`${hostname}api/files/${filename}`)
			.then(function(response) {
				$('#deleteFileModal').modal('hide')
				// re-fetch users table data
				getFiles()
			})
			.catch(function(error) {
				alert(error.response.data)
			})
	})

	// On show bs.modal ( Delete File )
	$('#deleteFileModal').on('show.bs.modal', function(event) {
		const button = $(event.relatedTarget)
		const filename = button.data('filename')
		const modal = $(this)
		modal.find('.modal-title').html(`Delete File: ${filename}`)
		// assign user id to submit btn
		document
			.querySelector('#file-delete-submit')
			.setAttribute('data-filename', filename)
	})
})
