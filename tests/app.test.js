const request = require("supertest");
const app = require("../index");

describe("POST /api/book-room", () => {

  test("cas complet (haute + weekend + seaView + normal)", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 2,
        season: "Haute",
        hasWeekend: true,
        seaView: true,
        clientType: "Normal",
        persons: 2
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBeGreaterThan(0);
  });

  test("sans options", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 2,
        season: "Basse",
        hasWeekend: false,
        seaView: false,
        clientType: "VIP",
        persons: 1
      });

    expect(res.statusCode).toBe(200);
  });

  test("long séjour", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 10,
        season: "Basse",
        hasWeekend: false,
        seaView: false,
        clientType: "Normal",
        persons: 1
      });

    expect(res.statusCode).toBe(200);
  });

});