export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const sgRequest = await $fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + config.public.SENDGRID_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body),
    template_id: config.public.SENDGRID_CLIENT_TEMPLATE_ID,
    from: {
      email: 'booking@taxi2airport.cz'
    },
    content: [
      {
        type: 'text/plain',
        value: 'This is a fallback message in case the template cannot be used.'
      }
    ]
  }).catch((error) => {
    return error
  })
  return sgRequest
})
