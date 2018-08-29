$(document).ready(function() {
	console.log('Login Page')
	// Login Request Chainer
	const loginAjaxChain = (data, callback) => {
		axios
			.post('http://localhost:3001/login', {
				firstName: data.usernameVal,
				lastName: data.passwordVal
			})
			.then(function(response) {
				callback(response)
			})
			.catch(function(error) {
				console.log(error)
			})
	}

	// Check Cookie Login
	if (Cookies.get('username') && Cookies.get('password')) {
		// $('body').hide()
		loginAjaxChain(
			{
				username: Cookies.get('username'),
				password: Cookies.get('password')
			},
			response => {
				if (response.status == 200) {
					location.href = '/'
				} else {
					// $('body').show()
				}
			}
		)
	}

	// Reset
	$('.reset-btn').on('click', function() {
		const inputUsername = $('#username')
		const inputPassword = $('#password')
		inputUsername.val('')
		inputPassword.val('')
	})

	// Login
	$('.login-btn').on('click', function() {
		const usernameVal = $('#username').val()
		const passwordVal = $('#password').val()

		loginAjaxChain({ usernameVal, passwordVal }, response => {
			if (response.status == 200) {
				Cookies.set('username', usernameVal)
				Cookies.set('password', passwordVal)
				location.href = '/'
			}
		})
	})
})
