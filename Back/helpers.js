const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API);

async function sendMail({ to, subject, message }) {
    try {
        const msg = {
            to,
            subject,
            from: process.env.SENDGRID_FROM,
            text: message,
        };

        await sendgrid.send(msg);
    } catch (error) {
        console.error(error);
        throw new Error('Error enviando mail');
    }
}

module.exports = {
    sendMail,
};
