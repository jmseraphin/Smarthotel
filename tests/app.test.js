const request = require("supertest");
const app = require("../index");

describe("POST /api/book-room", () => {

  test("cas complet (haute + weekend + seaView + normal)", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 2,
      season: "Haute",
      hasWeekend: true,
      seaView: true,
      clientType: "Normal",
      persons: 2,
    });
    expect(res.statusCode).toBe(200);
    // 100*2=200 → *1.5=300 → *1.2=360 → +30*2=420 → +15*2*2=480
    expect(res.body.total).toBe(480);
  });

  test("basse saison — aucune option", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 1,
      season: "Basse",
      hasWeekend: false,
      seaView: false,
      clientType: "VIP",
      persons: 1,
    });
    expect(res.statusCode).toBe(200);
    // 100*1 = 100, aucun modificateur
    expect(res.body.total).toBe(100);
  });

  test("haute saison — multiplicateur ×1.5", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 1,
      season: "Haute",
      hasWeekend: false,
      seaView: false,
      clientType: "VIP",
      persons: 1,
    });
    expect(res.statusCode).toBe(200);
    // 100 → *1.5 = 150
    expect(res.body.total).toBe(150);
  });

  test("weekend — multiplicateur ×1.2", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 1,
      season: "Basse",
      hasWeekend: true,
      seaView: false,
      clientType: "VIP",
      persons: 1,
    });
    expect(res.statusCode).toBe(200);
    // 100 → *1.2 = 120
    expect(res.body.total).toBe(120);
  });

  test("long séjour (>7 nuits) — réduction 15%", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 10,
      season: "Basse",
      hasWeekend: false,
      seaView: false,
      clientType: "VIP",
      persons: 1,
    });
    expect(res.statusCode).toBe(200);
    // 100*10=1000 → *0.85 = 850
    expect(res.body.total).toBe(850);
  });

  test("vue mer — +30€ par nuit", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 2,
      season: "Basse",
      hasWeekend: false,
      seaView: true,
      clientType: "VIP",
      persons: 1,
    });
    expect(res.statusCode).toBe(200);
    // 100*2=200 → +30*2 = 260
    expect(res.body.total).toBe(260);
  });

  test("petit-déjeuner — +15€/personne/nuit pour non-VIP", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 2,
      season: "Basse",
      hasWeekend: false,
      seaView: false,
      clientType: "Normal",
      persons: 2,
    });
    expect(res.statusCode).toBe(200);
    // 100*2=200 → +15*2*2 = 260
    expect(res.body.total).toBe(260);
  });

  test("VIP — pas de petit-déjeuner facturé", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 2,
      season: "Basse",
      hasWeekend: false,
      seaView: false,
      clientType: "VIP",
      persons: 2,
    });
    expect(res.statusCode).toBe(200);
    // 100*2 = 200, pas de petit-déj
    expect(res.body.total).toBe(200);
  });

  test("combinaison multiple — résultat positif", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100,
      nights: 5,
      season: "Haute",
      hasWeekend: true,
      seaView: true,
      clientType: "Normal",
      persons: 2,
    });
    expect(res.statusCode).toBe(200);
    // 100*5=500 → *1.5=750 → *1.2=900 → +30*5=1050 → +15*2*5=1200
    expect(res.body.total).toBe(1200);
  });

  test("input invalide — 400", async () => {
    const res = await request(app).post("/api/book-room").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid input");
  });

});
