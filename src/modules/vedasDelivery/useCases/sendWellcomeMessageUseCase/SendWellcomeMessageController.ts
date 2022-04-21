import { Message, Whatsapp } from "venom-bot";

import { WellcomeMessageRepository } from "@modules/vedasDelivery/infra/axios/WellcomeMessageRepository";
import { SendWellcomeMessageUseCase } from "@modules/vedasDelivery/useCases/sendWellcomeMessageUseCase/SendWellcomeMessageUseCase";

class SendWellcomeMessageController {
  async handle(whatsappInstance: Whatsapp, apiKey: string, newMessage: Message) {
    const wellcomeMessageRepository = new WellcomeMessageRepository();

    const sendWellComerMessageUseCase = new SendWellcomeMessageUseCase(whatsappInstance, wellcomeMessageRepository);

    const message = await sendWellComerMessageUseCase.execute(apiKey, newMessage);

    // eslint-disable-next-line no-console
    console.log(`${message} - CONTATO: ${newMessage.from}`);
  }
}

export { SendWellcomeMessageController };
