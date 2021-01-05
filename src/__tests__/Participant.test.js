const app = require("../api")
const supertest = require("supertest");
let token;
require('dotenv').config()
describe("UC-40x Maaltijd Detail", () => {
  beforeAll(async () => {
    let result;
    let register = {
      email: "email@emailors.o4rg",
      password: "Feeeeeeeeeeee",
    };

    await supertest(app).post("/api/login")
      .send(register)
      .then(function (res) {
        if (res) {
          result = res;
        }
      });
    console.log(result.body);
    token = result.body.token;
  });
  describe("UC-401 Aanmelden voor maaltijd", () => {
    test("TC-401-1 Niet ingelogd", async () => {
      await supertest(app).post("/api/dormatories/8/meal/5/signup")
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401)
      expect(result.body.name).toBe("Authorization Error");
      expect(result.body.errors[0].message).toBe("Not Logged In");
    })

    test("TC-401-2 Maaltijd bestaat niet ", async () => {
      await supertest(app).post("/api/dormatories/8/meal/"+Number.MAX_SAFE_INTEGER+"/signup")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message).toBe("No Meals match your query");
    })

    test("TC-401-3 Succesvol aangemeld ", async () => {
      await supertest(app).post("/api/dormatories/8/meal/5/signup")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
    })
  })
  describe("UC-402 afmelden voor maaltijd", () => {
    test("TC-402-1 Niet ingelogd", async () => {
      await supertest(app).post("/api/dormatories/8/meal/5/signoff")
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401)
      expect(result.body.name).toBe("Authorization Error");
      expect(result.body.errors[0].message).toBe("Not Logged In");
    })

    test("TC-402-2 Maaltijd bestaat niet ", async () => {
      await supertest(app).post("/api/dormatories/8/meal/"+Number.MAX_SAFE_INTEGER+"/signoff")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message).toBe("No Participants match your query");
    })

    test("TC-402-3 Aanmelding bestaat niet ", async () => {
      await supertest(app).post("/api/dormatories/8/meal/"+Number.MAX_SAFE_INTEGER+"/signoff")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message).toBe("No Participants match your query");
    })

    test("TC-402-4 Succesvol afgemeld ", async () => {
      await supertest(app).post("/api/dormatories/8/meal/5/signoff")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
    })
  })
  describe("UC-403 Lijst van deelnemers opvragen", () => {
    test("TC-403-1 Niet ingelogd", async () => {
      await supertest(app).get("/api/meals/5/participants")
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401)
      expect(result.body.name).toBe("Authorization Error");
      expect(result.body.errors[0].message).toBe("Not Logged In");
    })

    test("TC-403-2 Maaltijd bestaat niet ", async () => {
      await supertest(app).get("/api/meals/"+Number.MAX_SAFE_INTEGER+"/participants")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message).toBe("No Participants match your query");
    })


    test("TC-403-3 Lijst van deelnemers geretourneerd ", async () => {
      await supertest(app).get("/api/meals/5/participants")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.length).toBeGreaterThanOrEqual(0)
    })
  })
  describe("UC-404 Details van deelnemers opvragen", () => {
    test("TC-404-1 Niet ingelogd", async () => {
      await supertest(app).get("/api/meals/5/participants/6")
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401)
      expect(result.body.name).toBe("Authorization Error");
      expect(result.body.errors[0].message).toBe("Not Logged In");
    })

    test("TC-404-2 Deelnemer bestaat niet ", async () => {
      await supertest(app).get("/api/meals/"+Number.MAX_SAFE_INTEGER+"/participants/"+Number.MAX_SAFE_INTEGER)
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message).toBe("No Participants match your query");
    })


    test("TC-404-3 Contactgegevens van deelnemer geretourneerd ", async () => {
      await supertest(app).get("/api/meals/5/participants/6")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.firstName).toBe("<string>")
      expect(result.body.password).toBeUndefined()
    })
  })
})
