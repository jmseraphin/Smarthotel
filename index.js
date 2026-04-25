// const express = require("express");
// const app = express();

// app.use(express.json());

// app.post("/api/book-room", (req, res) => {
//   let {
//     pricePerNight,
//     nights,
//     season,
//     hasWeekend,
//     seaView,
//     clientType,
//     persons
//   } = req.body;

//   let total = pricePerNight * nights;

//   // Saison
//   if (season === "Haute") {
//     total = total + (total * 0.5);
//   } else {
//     total = total;
//   }

//   // Weekend
//   if (hasWeekend === true) {
//     total = total + (total * 0.2);
//   } else {
//     total = total;
//   }

//   // Long séjour
//   if (nights > 7) {
//     total = total - (total * 0.15);
//   } else {
//     total = total;
//   }

//   // Vue mer
//   if (seaView === true) {
//     total = total + (30 * nights);
//   } else {
//     total = total;
//   }

//   // Petit déjeuner
//   if (clientType === "VIP") {
//     total = total;
//   } else {
//     if (persons > 0) {
//       total = total + (15 * persons * nights);
//     } else {
//       total = total;
//     }
//   }

//   res.json({ total });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });











const express = require("express");
const app = express();

app.use(express.json());

// fonctions séparées
function applySeason(total, season) {
  if (season === "Haute") return total * 1.5;
  return total;
}

function applyWeekend(total, hasWeekend) {
  if (hasWeekend) return total * 1.2;
  return total;
}

function applyLongStay(total, nights) {
  if (nights > 7) return total * 0.85;
  return total;
}

function applySeaView(total, seaView, nights) {
  if (seaView) return total + 30 * nights;
  return total;
}

function applyBreakfast(total, clientType, persons, nights) {
  if (clientType !== "VIP") return total + 15 * persons * nights;
  return total;
}

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

  total = applySeason(total, season);
  total = applyWeekend(total, hasWeekend);
  total = applyLongStay(total, nights);
  total = applySeaView(total, seaView, nights);
  total = applyBreakfast(total, clientType, persons, nights);

  res.json({ total });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});