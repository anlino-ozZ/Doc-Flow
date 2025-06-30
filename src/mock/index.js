export const mockUser = {
  login: {
    url: '/api/login',
    method: 'post',
    response: () => ({
      code: 200,
      data: { token: 'mock-token', userInfo: { name: 'test' } }
    })
  }
}
