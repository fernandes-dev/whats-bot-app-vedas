import { WellcomeMessage } from "@modules/vedasDelivery/entities/WellcomeMessage";
import { IWellcomeMessageRepository } from "@modules/vedasDelivery/repositories/IWellcomeMessageRepository";

const wellcomeMessageMock: WellcomeMessage = {
  id: 1,
  title: "teste",
  message: "teste",
  company_id: 1,
  created_at: new Date(),
  updated_at: new Date(),
};

class WellcomeMessageRepositoryInMemory implements IWellcomeMessageRepository {
  private repository = wellcomeMessageMock;

  async getWellcomeMessageByApiKey(): Promise<WellcomeMessage> {
    return this.repository;
  }
}

export { WellcomeMessageRepositoryInMemory };
