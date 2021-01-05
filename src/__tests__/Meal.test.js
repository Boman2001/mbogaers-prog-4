const app = require("../api")
const supertest = require("supertest");
let token;
require('dotenv').config()
describe("UC-30x Maaltijd", () => {
  describe("UC-301 Maaltijd aanmaken", () => {
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

    test("TC-301-1 Verplicht veld ontbreekt ", async () => {
      let result;
      let meal = {
        "name": "<string>",
        "served": "<dateTime>",
        "allergies": "<string>",
        "ingredients": "<string>",
        "maxParticipants": 60,
        "offeredOn": "2220-09-01"
      }
      await supertest(app).post("/api/dormatories/8/meal")
        .set("Authorization", "token " + token)
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(400)
      expect(result.body.name).toBe("SequelizeValidationError");
      expect(result.body.errors[0].message).toBe("meal.description cannot be null");
    })
    test("TC-301-2 Niet ingelogd", async () => {
      let result;
      let meal = {
        "name": "<string>",
        "description": "<string>",
        "served": "<dateTime>",
        "allergies": "<string>",
        "ingredients": "<string>",
        "maxParticipants": 60,
        "offeredOn": "2220-09-01"
      }
      await supertest(app).post("/api/dormatories/8/meal")
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })

    test("TC-301-3 gerecht succesvol toegevoegd", async () => {
      let random = Math.random() * 50;
      let result;
      let meal = {
        "name": random,
        "description": "<string>",
        "served": "<dateTime>",
        "price": 55,
        "allergies": "<string>",
        "ingredients": "<string>",
        "maxParticipants": 60,
        "offeredOn": "2220-09-01"
      }

      await supertest(app).post("/api/dormatories/8/meal")
        .set("Authorization", "token " + token)
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
            console.log(res);
          }
        });
      expect(result.statusCode).toBe(200);
      expect(result.body.name).toBe(random);
      createId = result.body.id;

    })
  });
  describe("UC-303 Lijst van maaltijden opvragen", () => {
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
      token = result.body.token;
    });

    test("TC-303-1 Lijst van maaltijden geretourneerd ", async () => {
      let result;
      await supertest(app).get("/api/dormatories/8/meal")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.length).toBeGreaterThanOrEqual(0);
    })
  });
  describe("UC-304 Details van Maaltijd", () => {
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
      token = result.body.token;
    });

    test("TC-304-1 Maaltijd bestaat niet ", async () => {
      let result;
      await supertest(app).get("/api/dormatories/8/meal/" + Number.MAX_SAFE_INTEGER)
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

    test("TC-304-2 Details van maaltijd geretourneerd", async () => {
      let result;
      await supertest(app).get("/api/dormatories/8/meal/6")
        .send()
        .set("Authorization", "token " + token)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.name).toBe("<string>");
    })
  });
  describe("UC-302 Maaltijd wijzigen", () => {
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

    test("TC-302-1 Verplicht veld ontbreekt ", async () => {
      let result;
      let meal = {
        "name": "<string>",
        "served": "<dateTime>",
        "allergies": "<string>",
        "ingredients": "<string>",
        "maxParticipants": 60,
        "offeredOn": "2220-09-01"
      }
      await supertest(app).put("/api/dormatories/8/meal/5")
        .set("Authorization", "token " + token)
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(400)
      expect(result.body.name).toBe("SequelizeValidationError");
      expect(result.body.errors[0].message).toBe("invalid object");
    })


    test("TC-302-4 Maaltijd bestaat niet", async () => {
      let result;
      let meal = {
        "name": "<string>",
        "description": "<string>",
        "served": "<dateTime>",
        "price": 55,
        "allergies": "<string>",
        "ingredients": "<string>",
        "maxParticipants": 60,
        "offeredOn": "2020-09-01"
      }
      await supertest(app).put("/api/dormatories/8/meal/" + Number.MAX_SAFE_INTEGER)
        .send(meal)
        .set("Authorization", "token " + token)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404);
      expect(result.body.name).toBe("Search Error");
    })

    test("TC-204-5 Niet ingelogd", async () => {
      let result;
      let meal = {
        "name": "<string>",
        "served": "<dateTime>",
        "allergies": "<string>",
        "ingredients": "<string>",
        "maxParticipants": 60,
        "offeredOn": "2220-09-01"
      }
      await supertest(app).put("/api/dormatories/8/meal/5")
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })

    test("TC-302-3 Niet de eigenaar van de data ", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "<string>",
        "city": "<email>",
        "telephone": "<string>"
      }
      await supertest(app).put("/api/dormatories/8/meal/1")
        .send(dormatories)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })


    test("TC-204-6 Studentenhuis succesvol gewijzigd", async () => {
      let random = Math.random() * 50;
      let result;
      let meal = {
        "name": random,
        "description": "<string>",
        "served": "<dateTime>",
        "price": 55,
        "allergies": "<string>",
        "ingredients": "<string>",
        "maxParticipants": 60,
        "offeredOn": "2020-09-01"
      }

      await supertest(app).put("/api/dormatories/8/meal/5")
        .send(meal)
        .set("Authorization", "token " + token)
        .then(function (res) {
          if (res) {
            result = res;
            console.log(res);
          }
        });
      expect(result.statusCode).toBe(200);
      expect(result.body.name).toBe(random);

    })
  });
  describe("UC-305 Maaltijd verwijderen ", () => {
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
    test("TC-305-1 Verplicht veld ontbreekt ", async () => {
      let result;
      await supertest(app).delete("/api/dormatories/8/meal/" + Number.MAX_SAFE_INTEGER)
        .send()
        .set("Authorization", "token " + token)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404);
      expect(result.body.name).toBe("Search Error");
    })

    test("TC-205-1 Maaltijd bestaat niet ", async () => {
      let result;
      await supertest(app).delete("/api/dormatories/8/meal/" + Number.MAX_SAFE_INTEGER)
        .send()
        .set("Authorization", "token " + token)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(404);
      expect(result.body.name).toBe("Search Error");
    })

    test("TC-205-2 Niet ingelogd ", async () => {
      let result;
      await supertest(app).delete("/api/dormatories/8/meal/5")
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })

    test("TC-205-3 Actor is geen eigenaar", async () => {
      let result;
      await supertest(app).delete("/api/dormatories/8/meal/2")
        .set("Authorization", "token " + token)
        .send()
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })

    test("TC-205-4 Studentenhuis succesvol verwijderd ", async () => {
      let random = Math.random() * 50;
      let result;
      let toDelete;
      await supertest(app).get("/api/dormatories/8/meal/")
        .send()
        .set("Authorization", "token " + token)
        .then(function (res) {
          if (res) {
            toDelete = res.body[res.body.length - 1];
          }
        });
      console.log(toDelete)
      await supertest(app).delete("/api/dormatories/8/meal/" + toDelete.id)
        .send()
        .set("Authorization", "token " + token)
        .then(function (res) {
          if (res) {
            result = res;
            console.log(res);
          }
        });
      console.log(result.statusCode);
      expect(result.statusCode).toBe(200);
      expect(result.body.name).toBe(toDelete.name);

    })
  });
})
describe("UC-40x Maaltijd Detail", () => {
  describe("UC-401 Aanmelden voor maaltijd", () => {
    test("TC-401-1 Niet ingelogd", async () => {
      await supertest(app).put("/api/dormatories/8/meal/5")
        .set("Authorization", "token " + token)
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(400)
      expect(result.body.name).toBe("SequelizeValidationError");
      expect(result.body.errors[0].message).toBe("invalid object");
    })

    test("TC-401-2 Maaltijd bestaat niet ", async () => {
      await supertest(app).put("/api/dormatories/8/meal/5")
        .set("Authorization", "token " + token)
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(400)
      expect(result.body.name).toBe("SequelizeValidationError");
      expect(result.body.errors[0].message).toBe("invalid object");
    })

    test("TC-401-3 Succesvol aangemeld ", async () => {
      await supertest(app).put("/api/dormatories/8/meal/5")
        .set("Authorization", "token " + token)
        .send(meal)
        .then(function (res) {
          if (res) {
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.name).toBe("SequelizeValidationError");
    })
  })


})
