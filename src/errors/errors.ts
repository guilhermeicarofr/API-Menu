export class Errors {
  signUp() {
    return {
      name: 'InvalidSignUp',
      message: 'Username already in use'
    };
  }

  userNotFound() {
    return {
      name: 'UserNotFound',
      message: 'Username not found'
    };
  }

  login() {
    return {
      name: 'InvalidLogin',
      message: 'Invalid login credentials'
    }
  }

  notFound() {
    return {
      name: 'NotFound',
      message: 'Entity not found'
    }
  }
}
