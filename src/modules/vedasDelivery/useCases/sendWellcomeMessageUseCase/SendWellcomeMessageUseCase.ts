import { differenceInHours } from "date-fns";
import { Message, Whatsapp } from "venom-bot";

import configs from "@configs/config.json";
import { IWellcomeMessageRepository } from "@modules/vedasDelivery/repositories/IWellcomeMessageRepository";

class SendWellcomeMessageUseCase {
  constructor(private whatsBot: Whatsapp, private wellcomeMessageRepository: IWellcomeMessageRepository) {}

  async execute(apiKey: string, newMessage: Message): Promise<string> {
    const successMessage = "Mensagem enviada com sucesso";

    try {
      const wellcomeMessage = await this.wellcomeMessageRepository.getWellcomeMessageByApiKey(apiKey);

      if (!wellcomeMessage) return "Mensagem de boas vindas não encontrada";

      const allMessages = await this.whatsBot.getAllMessagesInChat(newMessage.chatId, true, false);

      const lastWellcomeMessageIndex = allMessages.reduce((previous, current, currentIndex) => {
        if (current.content && current.content.includes(wellcomeMessage.message)) return currentIndex;
        return previous;
      }, -1);

      const alreadySentWellcomeMessage = allMessages[lastWellcomeMessageIndex];
      const lastMessage = allMessages[allMessages.length - 1];

      if (!alreadySentWellcomeMessage) {
        await this.whatsBot.sendText(newMessage.from, wellcomeMessage.message);

        return successMessage;
      }

      const alreadySentWellcomeMessageDate = new Date(alreadySentWellcomeMessage.timestamp * 1000);
      const lastMessageDate = new Date(lastMessage.timestamp * 1000);

      const differenceBetweenCurrentDateAndLastMessageDate = differenceInHours(
        lastMessageDate,
        alreadySentWellcomeMessageDate
      );

      const shouldResendWellcomeMessage =
        differenceBetweenCurrentDateAndLastMessageDate >= Number(configs.INTERVALO_EM_HORAS || 24);

      if (shouldResendWellcomeMessage) {
        await this.whatsBot.sendText(newMessage.from, wellcomeMessage.message);

        return successMessage;
      }

      return successMessage;
    } catch (e) {
      return `Erro ao enviar mensagem de boas vindas: ${e.message || JSON.stringify(e)}`;
    }
  }
}

export { SendWellcomeMessageUseCase };
