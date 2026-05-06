// const request = require("supertest");
// const app = require("../index");

// describe("POST /api/book-room", () => {

//   test("cas complet (haute + weekend + seaView + normal)", async () => {
//     const res = await request(app)
//       .post("/api/book-room")
//       .send({
//         pricePerNight: 100,
//         nights: 2,
//         season: "Haute",
//         hasWeekend: true,
//         seaView: true,
//         clientType: "Normal",
//         persons: 2
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.total).toBeGreaterThan(0);
//   });

//   test("sans options", async () => {
//     const res = await request(app)
//       .post("/api/book-room")
//       .send({
//         pricePerNight: 100,
//         nights: 2,
//         season: "Basse",
//         hasWeekend: false,
//         seaView: false,
//         clientType: "VIP",
//         persons: 1
//       });

//     expect(res.statusCode).toBe(200);
//   });

//   test("long séjour", async () => {
//     const res = await request(app)
//       .post("/api/book-room")
//       .send({
//         pricePerNight: 100,
//         nights: 10,
//         season: "Basse",
//         hasWeekend: false,
//         seaView: false,
//         clientType: "Normal",
//         persons: 1
//       });

//     expect(res.statusCode).toBe(200);
//   });

// });













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
    expect(res.body.total).toBeDefined();
  });

  test("basse season simple", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 1,
        season: "Basse",
        hasWeekend: false,
        seaView: false,
        clientType: "VIP",
        persons: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBeDefined();
  });

  test("weekend uniquement", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 1,
        season: "Basse",
        hasWeekend: true,
        seaView: false,
        clientType: "VIP",
        persons: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBeDefined();
  });

  test("sea view uniquement", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 1,
        season: "Basse",
        hasWeekend: false,
        seaView: true,
        clientType: "VIP",
        persons: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBeDefined();
  });

  test("long séjour (discount)", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 10,
        season: "Basse",
        hasWeekend: false,
        seaView: false,
        clientType: "VIP",
        persons: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBeDefined();
  });

  test("client normal avec breakfast", async () => {
    const res = await request(app)
      .post("/api/book-room")
      .send({
        pricePerNight: 100,
        nights: 2,
        season: "Basse",
        hasWeekend: false,
        seaView: false,
        clientType: "Normal",
        persons: 2
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBeDefined();
  });

});