$('.ui.form')
    .form({
      fields: {
        firstName: {
          identifier: 'firstName',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a first name',
            },
          ],
        },
        lastName: {
          identifier: 'lastName',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a last name',
            },
          ],
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter an email address',
            },
          ],
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a password',
            },
          ],
        },
      },
    })
;
