const app = require("../api")
const supertest = require("supertest");
let token;
let createId;
require('dotenv').config()
describe("UC-20x Studentenhuis", ()=>{
  describe("UC-201 Maak studentenhuis",  () => {
    beforeAll(async () => {
      let result;
      let register = {
        email: "email@emailors.o4rg",
        password: "Feeeeeeeeeeee",
      };

      await supertest(app).post("/api/login")
        .send(register)
        .then(function(res){
          if (res){
            result = res;
          }
        });

      token = result.body.token;
    });

    test("TC-201-1 Verplicht veld ontbreekt ", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921ZB",
        "telephone": "0031636372819"
      }
      await supertest(app).post("/api/dormatories")
        .set("Authorization", "token " + token)
        .send(dormatories)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(400)
      expect(result.body.name).toBe("SequelizeValidationError");
      expect(result.body.errors[0].message).toBe("studenthome.city cannot be null");
    })

    test("TC-201-2 Invalide postcode ", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "<stringddddddddddd>",
        "city": "<email>",
        "telephone": "0031636303815"
      }
      await supertest(app).post("/api/dormatories")
        .send(dormatories)
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(400);
      expect(result.body.name).toBe("Validation Error");
      expect(result.body.errors[0].message).toBe("postalCode Should be valid dutch postal code");
    })

    test("TC-201-3 Invalide telefoonnummer ", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921ZB",
        "city": "4921ZB",
        "telephone": "<string>"
      }
      await supertest(app).post("/api/dormatories")
        .send(dormatories)
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(400);
      expect(result.body.name).toBe("Validation Error");
      expect(result.body.errors[0].message).toBe("Phonenumber should be a valid dutch phone number");
    })

    test("TC-201-4 Studentenhuis bestaat al", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921ZB",
        "city": "<email>",
        "telephone": "0031636303815"
      }
      await supertest(app).post("/api/dormatories")
        .send(dormatories)
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(400);
      expect(result.body.name).toBe("SequelizeUniqueConstraintError");
    })

    test("TC-201-5 Niet ingelogd", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "<string>",
        "city": "<email>",
        "telephone": "<string>"
      }
      await supertest(app).post("/api/dormatories")
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })

    test("TC-201-6 Studentenhuis succesvol toegevoegd", async () => {
      let random = Math.random() * 50;
      let result;
      let dormatories = {
        "name": random,
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921zb",
        "city": "<email>",
        "telephone": "0031635343625"
      }

      await supertest(app).post("/api/dormatories")
        .send(dormatories).set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200);
      expect(result.body.name).toBe(random);
      createId = result.body.id;

    })
  });
  describe("UC-202 Overzicht van studentenhuizen",  () => {
    beforeAll(async () => {
      let result;
      let register = {
        email: "email@emailors.o4rg",
        password: "Feeeeeeeeeeee",
      };

      await supertest(app).post("/api/login")
        .send(register)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      token = result.body.token;
    });

    test("TC-202-1 Toon nul studentenhuizen", async () => {
      let result;
      await supertest(app).get("/api/dormatories?limit=0")
        .set("Authorization", "token " + token)
        .send()
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.length).toBe(0);
    })

    test("TC-202-2 Toon twee studentenhuizen", async () => {
      let result;
      await supertest(app).get("/api/dormatories?limit=2")
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.length).toBe(2);
    })

    test("TC-202-3 Toon studentenhuizen met zoekterm op niet-bestaande stad ", async () => {
      let result;
      await supertest(app).get("/api/dormatories?city=ballsww")
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message.message).toBe("No results match your query cant find");
      expect(result.body.errors[0].message.query.city).toBe("ballsww");
    })

    test("TC-202-4 Toon studentenhuizen met zoekterm op niet-bestaande naam ", async () => {
      let result;
      await supertest(app).get("/api/dormatories?name=ballsww")
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message.message).toBe("No results match your query cant find");
      expect(result.body.errors[0].message.query.name).toBe("ballsww");
    })

    test("TC-202-5 Toon studentenhuizen met zoekterm op bestaande stad ", async () => {
      let result;
      await supertest(app).get("/api/dormatories?city=breda")
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200);
      expect(result.body.length).toBeGreaterThan(0);
    })

    test("TC-202-6 Toon studentenhuizen met zoekterm op bestaande naam", async () => {
      let result;
      await supertest(app).get("/api/dormatories?name=Princenhage")
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200);
      expect(result.body.length).toBeGreaterThan(0);
    })
  });
  describe("UC-203 Details van studentenhuis ",  () => {
    beforeAll(async () => {
      let result;
      let register = {
        email: "email@emailors.o4rg",
        password: "Feeeeeeeeeeee",
      };

      await supertest(app).post("/api/login")
        .send(register)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      token = result.body.token;
    });

    test("TC-203-1 Studentenhuis-ID bestaat niet", async () => {
      let result;
      await supertest(app).get("/api/dormatories/"+Number.MAX_SAFE_INTEGER)
        .set("Authorization", "token " + token)
        .send()
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(404)
      expect(result.body.name).toBe("Search Error");
      expect(result.body.errors[0].message).toBe("No results match your query cant find");
    })

    test("TC-203-2 Studentenhuis-ID bestaat", async () => {
      let result;
      await supertest(app).get("/api/dormatories/1")
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200)
      expect(result.body.name).toBe("Princenhage");
    })
  });
  describe("UC-204 Studentenhuis wijzigen",  () => {
    beforeAll(async () => {
      let result;
      let register = {
        email: "email@emailors.o4rg",
        password: "Feeeeeeeeeeee",
      };

      await supertest(app).post("/api/login")
        .send(register)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      token = result.body.token;
    });

    test("TC-204-1 Verplicht veld ontbreekt ", async () => {
      let result;
      let dormatories = {
        "name": "<string>reeeeeeeeeeeeeeeedwedwd",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921ZB",
        "telephone": "0031636372819"
      }
      await supertest(app).put("/api/dormatories/5")
        .set("Authorization", "token " + token)
        .send(dormatories)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(400)
      expect(result.body.name).toBe("SequelizeValidationError");
      expect(result.body.errors[0].message).toBe("invalid object");
    })

    test("TC-204-2 Invalide postcode ", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "<stringddddddddddd>",
        "city": "<email>",
        "telephone": "0031636303815"
      }
      await supertest(app).put("/api/dormatories/5")
        .send(dormatories)
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(400);
      expect(result.body.name).toBe("Validation Error");
      expect(result.body.errors[0].message).toBe("postalCode Should be valid dutch postal code");
    })

    test("TC-204-3 Invalide telefoonnummer ", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921ZB",
        "city": "4921ZB",
        "telephone": "<string>"
      }
      await supertest(app).put("/api/dormatories/5")
        .send(dormatories)
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(400);
      expect(result.body.name).toBe("Validation Error");
      expect(result.body.errors[0].message).toBe("Phonenumber should be a valid dutch phone number");
    })

    test("TC-204-4 Studentenhuis bestaat niet", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921ZB",
        "city": "<email>",
        "telephone": "0031636303815"
      }
      await supertest(app).put("/api/dormatories/" + Number.MAX_SAFE_INTEGER)
        .send(dormatories)
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(404);
      expect(result.body.name).toBe("Search Error");
    })

    test("TC-204-5 Niet ingelogd", async () => {
      let result;
      let dormatories = {
        "name": "<string>",
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "<string>",
        "city": "<email>",
        "telephone": "<string>"
      }
      await supertest(app).put("/api/dormatories/5")
        .send(dormatories)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })

    test("TC-204-6 Studentenhuis succesvol gewijzigd", async () => {
      let random = Math.random() * 50;
      let result;
      let dormatories = {
        "name": random,
        "address": "<string>",
        "houseNr": 6,
        "postalCode": "4921zb",
        "city": "<email>",
        "telephone": "0031635343625"
      }

      await supertest(app).put("/api/dormatories/5")
        .send(dormatories)
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200);
      expect(result.body.name).toBe(random);

    })
  });
  describe("UC-205 Studentenhuis verwijderen ",  () => {
    beforeAll(async () => {
      let result;
      let register = {
        email: "email@emailors.o4rg",
        password: "Feeeeeeeeeeee",
      };

      await supertest(app).post("/api/login")
        .send(register)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      token = result.body.token;
    });

    test("TC-205-1 Studentenhuis bestaat niet ", async () => {
      let result;
      await supertest(app).delete("/api/dormatories/" + Number.MAX_SAFE_INTEGER)
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(404);
      expect(result.body.name).toBe("Search Error");
    })

    test("TC-205-2 Niet ingelogd ", async () => {
      let result;
      await supertest(app).delete("/api/dormatories/5")
        .send()
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(401);
      expect(result.body.name).toBe("Authorization Error");
    })

    test("TC-205-3 Actor is geen eigenaar", async () => {
      let result;
      await supertest(app).delete("/api/dormatories/2")
        .send()
        .then(function(res){
          if (res){
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
      await supertest(app).get("/api/dormatories/")
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            toDelete = res.body[res.body.length -1];
          }
        });
      await supertest(app).delete("/api/dormatories/"+toDelete.id)
        .send()
        .set("Authorization", "token " + token)
        .then(function(res){
          if (res){
            result = res;
          }
        });
      expect(result.statusCode).toBe(200);
      expect(result.body.name).toBe(toDelete.name);

    })
  });
})

