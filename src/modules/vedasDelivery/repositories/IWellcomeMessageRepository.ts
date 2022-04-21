import { WellcomeMessage } from "@modules/vedasDelivery/entities/WellcomeMessage";

interface IWellcomeMessageRepository {
  getWellcomeMessageByApiKey(apiKey: string): Promise<WellcomeMessage>;
}

export { IWellcomeMessageRepository };
