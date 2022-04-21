import { create } from "venom-bot";

import config from "@configs/config.json";

import { handleMessages } from "./handleMessages";

async function startWhatsBOT() {
  try {
    const whatsappInstance = await create({
      session: config.nome_da_empresa,
      multidevice: config.mutiplos_dispositivos,
    });

    await handleMessages(whatsappInstance);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Erro ao executar whatsapp", error);
  }
}

(async function main() {
  await startWhatsBOT();
})();
