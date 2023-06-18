const express = require("express");
const app = express();

const port = 3030;

// Define route
app.get("/", (req, res) => {
  console.log("Client connected");

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const intervalId = setInterval(() => {
    const date = new Date().toLocaleString();

    // const eventMessage = `event: message\ndata: ${date}\n\n`;
    const updateMessage = `event: update\ndata: Kode dari pesan ini sedikit berbeda dari sebelumnya\n\n`;
    res.write(
      `event: message\n Halo client ini Dyas, kamu menerima pesan ini pada: ${date}\n\n`
    );
    res.write(updateMessage);
  }, 10000);

  res.on("close", () => {
    console.log("Client closed connection");
    clearInterval(intervalId);
    res.end();
  });
  // res.status(200).send("x");
});

app.listen(port, () => {
  console.log(`Server is running`);
});
