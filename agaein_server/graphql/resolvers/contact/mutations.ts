import { MutationContactUsArgs } from '../../types';
import { sendMessageToUs } from './services';

const contactMutations = {
    contactUs: async (_: any, contactRequest: MutationContactUsArgs) => {
        await sendMessageToUs(contactRequest.sender ?? undefined, contactRequest.subject, contactRequest.content);

        return 'SUCCESS';
    },
};

export default contactMutations;
