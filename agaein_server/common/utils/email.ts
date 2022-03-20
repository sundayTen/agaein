import nodemailer from 'nodemailer';

export function sendEmail(email: String, content: String) {
    const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PW,
        },
    });

    const mailOptions: any = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Agaein 댓글 알림이 왔어요.',
        text: content,
    };

    smtpTransport.sendMail(mailOptions, (err, res) => {
        smtpTransport.close();
    });
}
