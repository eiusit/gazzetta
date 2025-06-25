exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Metodo non consentito. Usa POST."
    };
  }

  try {
    const data = JSON.parse(event.body);

    const { title, link, date } = data;

    if (!title || !link) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Dati mancanti" })
      };
    }

    // ✅ Qui puoi aggiungere codice per salvare i dati in un DB, inviare email, ecc.
    console.log("Item ricevuto:", { title, link, date });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, received: { title, link, date } })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
