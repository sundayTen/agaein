import nodemailer from 'nodemailer';

export function sendEmail(email: String, articleId: Number, content: String) {
    const smtpTransport = nodemailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PW,
        },
    });

    const mailOptions: any = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Agaein 알림이 왔어요.',
        text: '알림 내용: ' + content + '\n보러가기: https://www.agaein.com/articleDetail/' + articleId,
    };

    smtpTransport.sendMail(mailOptions, (err, res) => {
        smtpTransport.close();
    });
}
