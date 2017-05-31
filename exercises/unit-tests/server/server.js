import mailSystem from './mailsystem/mailSystem'

const backend = {
  transfer(mails) {
    console.log('>>>>>> Transfer emails to backend:', mails)
  },
}

mailSystem.init('info@euri.com')
mailSystem.sendWelcomeMail('peter.cosemans@gmail.com',
  'Welcome to...', {
    name: 'peter',
  })

mailSystem.transferMails(backend)
