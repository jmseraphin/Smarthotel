const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/book-room", (req, res) => {
  let {
    pricePerNight,
    nights,
    season,
    hasWeekend,
    seaView,
    clientType,
    persons
  } = req.body;

  let total = pricePerNight * nights;

  // Saison
  if (season === "Haute") {
    total = total + (total * 0.5);
  } else {
    total = total;
  }

  // Weekend
  if (hasWeekend === true) {
    total = total + (total * 0.2);
  } else {
    total = total;
  }

  // Long séjour
  if (nights > 7) {
    total = total - (total * 0.15);
  } else {
    total = total;
  }

  // Vue mer
  if (seaView === true) {
    total = total + (30 * nights);
  } else {
    total = total;
  }

  // Petit déjeuner
  if (clientType === "VIP") {
    total = total;
  } else {
    if (persons > 0) {
      total = total + (15 * persons * nights);
    } else {
      total = total;
    }
  }

  res.json({ total });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});