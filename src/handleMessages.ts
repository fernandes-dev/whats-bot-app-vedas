import { Whatsapp } from "venom-bot";

import configs from "@configs/config.json";
import { SendWellcomeMessageController } from "@modules/vedasDelivery/useCases/sendWellcomeMessageUseCase/SendWellcomeMessageController";

const sendWellcomeMessageController = new SendWellcomeMessageController();

const apiKey = configs.chave_da_api;

export async function handleMessages(whatsappInstance: Whatsapp) {
  return whatsappInstance.onMessage(async (message) => {
    if (message.isGroupMsg) return;

    await sendWellcomeMessageController.handle(whatsappInstance, apiKey, message);
  });
}
