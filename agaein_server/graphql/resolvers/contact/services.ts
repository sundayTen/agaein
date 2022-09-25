import { sendEmailToUs } from '../../../common/utils/email';

export async function sendMessageToUs(sender: String | undefined, subject: String, content: String) {
    await sendEmailToUs(sender, subject, content);
}
