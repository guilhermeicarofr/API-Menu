export class Errors {
  signUp() {
    return {
      name: 'InvalidSignUp',
      message: 'Username already in use'
    };
  }
}
