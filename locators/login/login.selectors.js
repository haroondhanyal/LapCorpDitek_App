export const LoginSelectors = {
  email: {
    primary: 'input[name="email"]',
    fallback: '[name="email"]',
    accessibility: 'input[type="email"]'
  },

  password: {
    primary: 'input[type="password"]'
  },

  rememberMe: {
    primary: 'input[type="checkbox"]'
  },

  signIn: {
    primary: 'button:has-text("Sign In")',
    fallback: 'text=Sign In'
  }
}
