import smtpTransport from './smtpTransport'
import repository from './repository'

const DEFAULT_FROM_ADDRESS = 'noreply@euri.com'

const mailSystem = {
  init(fromAddress = DEFAULT_FROM_ADDRESS) {
    this.fromAddress = fromAddress
  },

  sendWelcomeMail(to, subject, model) {
    const body = `Hello ${model.name}, with this mail I...`
    const mail = {
      toAddress: to,
      fromAddress: this.fromAddress,
      subject,
      body,
    }
    smtpTransport.send(mail)
  },

  transferMails(backend) {
    // get mail from db
    const mails = repository.getMails()

    // get filtered mails
    const filteredMails = mails.filter(mail => mail.to.includes('euri.com'))

    // transfer to backend
    backend.transfer(filteredMails)
  },

}

export default mailSystem
