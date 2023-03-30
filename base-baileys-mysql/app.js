const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
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

const flowSecundario = addKeyword(["Como pagar"]).addAnswer("banco");

// ** S A L U D O **

const flowSaludo = addKeyword([
  "Hola",
  "Ola",
  "hola",
  "ola",
  "Buenas",
  "buenas",
])
  .addAnswer([
    "Hola 😁 En *Agartha Marketing Agency* te damos la bienvenida",
    "",
    "Un gusto porder atenderte 🙌",
  ])

  // ** F O R M U L A R I O **

  .addAnswer("¿Cuál es tu Nombre?", { capture: true }, (ctx, { fallBack }) => {
    if (!ctx.body.includes("")) {
      return fallBack();
    }
    console.log("Aquí viene todo: ", ctx.body);
  })

  .addAnswer(
    "¿Cuál es tu apellido paterno?",
    { capture: true },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )

  .addAnswer(
    "¿Cuál es tu apellido materno?",
    { capture: true },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )

  .addAnswer(
    "Por último, nos gustaría saber tu correo electrónico para poder comunicarnos contigo 💪",
    { capture: true },
    (ctx, { fallBack }) => {
      // LA IDEA ES QUE ACEPTE @ Y ., SI NO CUMPLE CON ALGUNOS DE ESOS PARAMETROS,
      // INMEDIATAMENTE ARROJE ERROR
      /*if (!ctx.body !== '@' | '.') {*/

      if (!ctx.body.includes("@")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )

  .addAnswer("Gracias por la Información, verificando datos de acceso 🕓")
  .addAnswer("Datos guardados con éxito !", { delay: 1700 })

  .addAnswer(
    [
      "Crea tu Formulario de Preguntas y Respuestas aquí 👇",
      "",
      "¿Quieres programar tus consultas frecuentes para los clientes? ✍",
    ],
    {
      buttons: [
        {
          body: "Si",
        },
        {
          body: "No",
        },
      ],
    },
    //La propiedad de NULL nos quita los [object Object] que se imprimen en pantalla
    null
  );

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
  });
  const adapterFlow = createFlow([flowSaludo, flowSecundario]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
