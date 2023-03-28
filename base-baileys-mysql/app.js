const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = "localhost";
const MYSQL_DB_USER = "pepito";
const MYSQL_DB_PASSWORD = "11111";
const MYSQL_DB_NAME = "pepito";
const MYSQL_DB_PORT = "3306";

const flowSecundario = addKeyword(["2", "Siguiente"]).addAnswer([
  "Aquí tenemos el Flujo Secundario",
]);

const flowAgartha = addKeyword([
  "Agartha",
  "documentacion",
  "documentación",
]).addAnswer(
  [
    "Aquí encontraras el enlace a la Página Oficial de Agartha",
    "https://agencyagartha.cl",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowTerminar = addKeyword(["Gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowCatalogo = addKeyword(["catalogo", "cata"]).addAnswer(
  ["🙌 Aquí encontras un ejemplo rápido", "https://agencyagartha.cl/shop/"],
  null,
  null,
  [flowSecundario]
);

const flujoSaludo = addKeyword(["Hola", "Buenas"])
  .addAnswer("🙌 Hola bienvenido/a te estas comunicando con *AgencyAgartha!*")
  .addAnswer("¿Cuál es tu Email?", { capture: true }, (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack();
    }
    console.log("Aquí viene todo: ", ctx.body);
  })

  .addAnswer("Gracias por la Información, verificando datos de acceso 🕓")
  .addAnswer("Bienvenido Cristian!", { delay: 1700 })
  .addAnswer(
    [
      "*Te comparto el contenido de la página de la Agencia*",

      "👉 Para ingresar al link de la Página escribe *Agartha*",
      "👉 Para ingresar al Catalogo de nuestros Productos escribe *Catalogo*",
      "👉 Para terminar la conversación escribe *Terminar*",
    ],
    null,
    null,
    [flowAgartha, flowCatalogo, flowTerminar]
  );

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
  });
  const adapterFlow = createFlow([
    flujoSaludo,
    flowAgartha,
    flowTerminar,
    flowCatalogo,
    flowSecundario,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
