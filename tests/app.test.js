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

  test("cas complet", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 2, season: "Haute",
      hasWeekend: true, seaView: true, clientType: "Normal", persons: 2
    });
    expect(res.statusCode).toBe(200);
  });

  test("basse season", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 1, season: "Basse",
      hasWeekend: false, seaView: false, clientType: "VIP", persons: 1
    });
    expect(res.body.total).toBe(100);
  });

  test("haute season multiplier", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 1, season: "Haute",
      hasWeekend: false, seaView: false, clientType: "VIP", persons: 1
    });
    expect(res.body.total).toBe(150);
  });

  test("weekend multiplier", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 1, season: "Basse",
      hasWeekend: true, seaView: false, clientType: "VIP", persons: 1
    });
    expect(res.body.total).toBe(120);
  });

  test("long stay discount", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 10, season: "Basse",
      hasWeekend: false, seaView: false, clientType: "VIP", persons: 1
    });
    expect(res.body.total).toBe(850);
  });

  test("sea view adds cost", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 2, season: "Basse",
      hasWeekend: false, seaView: true, clientType: "VIP", persons: 1
    });
    expect(res.body.total).toBe(260);
  });

  test("breakfast non VIP", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 2, season: "Basse",
      hasWeekend: false, seaView: false, clientType: "Normal", persons: 2
    });
    expect(res.body.total).toBe(260);
  });

  test("VIP no breakfast", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 2, season: "Basse",
      hasWeekend: false, seaView: false, clientType: "VIP", persons: 2
    });
    expect(res.body.total).toBe(200);
  });

  test("combinaison multiple", async () => {
    const res = await request(app).post("/api/book-room").send({
      pricePerNight: 100, nights: 5, season: "Haute",
      hasWeekend: true, seaView: true, clientType: "Normal", persons: 2
    });
    expect(res.body.total).toBeGreaterThan(0);
  });

  test("invalid input", async () => {
    const res = await request(app).post("/api/book-room").send({});
    expect(res.statusCode).toBe(400);
  });

});