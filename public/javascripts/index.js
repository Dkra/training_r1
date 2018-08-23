$(document).ready(function() {
	console.log('Index Page')

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
