import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST/weather", () => {
  describe("when a city name is not provided", () => {
    const bodyData = [
      { cityName: "" },
      { cityName: null },
      { cityName: undefined },
      {},
    ];

    //Respond with 400 status code
    it("should respond with a 400 status code ", async () => {
      for (const body of bodyData) {
        const response = await request.post("/weather").send(body);
        expect(response.status).toBe(400);
      }
    });

    //Respond with a JSON
    it("should specify JSON in the content type header ", async () => {
      for (const body of bodyData) {
        const response = await request.post("/weather").send(body);
        expect(response.headers["content-type"]).toMatch(/json/);
      }
    });
  });

  describe("Given a city name", () => {
    // When the city name is valid
    describe("when the city name is valid", () => {
      const body = { cityName: "Istanbul" };

      // Respond with 200 status Code
      it("should respond with a 200 status code  ", async () => {
        const response = await request.post("/weather").send(body);
        expect(response.status).toBe(200);
      });

      //Respond with a JSON
      it("should specify JSON in the content type header ", async () => {
        const response = await request.post("/weather").send(body);
        expect(response.headers["content-type"]).toMatch(/json/);
      });
      it("should return a Json object with cityName in string format and temperature in number format", async () => {
        const response = await request.post("/weather").send(body);
        expect(response.body).toMatchObject({
          cityName: "Istanbul",
          temperature: expect.any(Number),
        });
      });
    });

    //When city is not found
    describe("when the city name is not found", () => {
      const body = { cityName: "Iddsffhf" };

      //Respond with 404 status code
      it("should respond with a 404 status code  ", async () => {
        const response = await request.post("/weather").send(body);
        expect(response.status).toBe(404);
      });

      //Respond with a JSON
      it("should specify JSON in the content type header ", async () => {
        const response = await request.post("/weather").send(body);
        expect(response.headers["content-type"]).toMatch(/json/);
      });
    });
  });
});
