const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

exports.sendEmail = async ({ to, subject, text, html }) => {
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            text,
            html
        })

        return data
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}
