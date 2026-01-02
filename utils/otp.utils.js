export async function verifyOtpViaApi(request, payload) {

  const response = await request.post(
    '/users/verify-otp',
    {
      data: payload
    }
  )

  if (!response.ok()) {
    throw new Error('OTP verification failed')
  }

  return await response.json()
}
