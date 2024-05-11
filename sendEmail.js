import sgMail from '@sendgrid/mail'
const apiKey = process.env.SENDGRID_API_KEY
console.log('aa', apiKey)
sgMail.setApiKey(apiKey)
const sendMessage = () => {
  const msg = {
  to: 'elmirmammadli18@gmail.com', // Change to your recipient
  from: 'booking@taxi2airport.cz', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'Salam ee bicbala gotbala',
  html: '<strong>salam bici gotbala gurcustan yek</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

export default sendMessage
