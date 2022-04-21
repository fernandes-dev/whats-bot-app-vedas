import axios, { AxiosStatic } from "axios";

import configs from "@configs/config.json";
import { WellcomeMessage } from "@modules/vedasDelivery/entities/WellcomeMessage";
import { IWellcomeMessageRepository } from "@modules/vedasDelivery/repositories/IWellcomeMessageRepository";

class WellcomeMessageRepository implements IWellcomeMessageRepository {
  private readonly repository: AxiosStatic;

  constructor() {
    this.repository = axios;

    this.repository.defaults.baseURL = configs.VEDAS_DELIVERY_SERVIDOR;
  }

  async getWellcomeMessageByApiKey(apiKey: string): Promise<WellcomeMessage> {
    const { data } = await this.repository({
      url: "/wellcome-message",
      method: "get",
      params: {
        apiKey,
      },
    });

    return data.wellcomeMessage;
  }
}

export { WellcomeMessageRepository };
