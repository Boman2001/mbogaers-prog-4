const app = require("../api")
const supertest = require("supertest");
require('dotenv').config()
describe("Register Route",  () => {
  test("TC-101-1 Verplicht veld ontbreekt", async () => {
    let result;
    let register = {
      "email": "email@email.org",
      "password": "<string>",
      "firstName": "<string>",
      "studentNumber": "<string>"
    };
    await supertest(app).post("/api/register")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
        }
      });
    expect(result.statusCode).toBe(400)
    expect(result.body.name).toBe("SequelizeValidationError");
    expect(result.body.errors[0].message).toBe("user.lastName cannot be null");
  })

  test("TC-101-2 Invalide email adres", async () => {
    let result;
    let register = {
      "email": "geenmail",
      "password": "Francois12345",
      "firstName": "herman",
      "lastName": "last",
      "studentNumber": "202020"
    };
    await supertest(app).post("/api/register")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
          console.log(res);
        }
      });
    expect(result.statusCode).toBe(400);
    expect(result.body.name).toBe("Validation Error");
    expect(result.body.errors[0].message).toBe("Email isnt a valid email");
  })

  test("TC-101-3 Invalide wachtwoord ", async () => {
    let result;
    let register = {
      "email": "email@email.org",
      "password": "F",
      "firstName": "herman",
      "lastName": "last",
      "studentNumber": "202020"
    };
    await supertest(app).post("/api/register")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
        }
      });
    expect(result.statusCode).toBe(400);
    expect(result.body.name).toBe("Validation Error");
    expect(result.body.errors[0].message).toBe("Password Should be longer than 5 characters");
  })

  test("TC-101-4 Gebruiker bestaat al ", async () => {
    let result;
    let register = {
      "email": "email@email.org",
      "password": "Feeeeeeeeeeee",
      "firstName": "herman",
      "lastName": "last",
      "studentNumber": "202020"
    };
    await supertest(app).post("/api/register")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
        }
      });
    console.log(result.body)
    console.log(process.env.DATABASE, process.env.USER, process.env.PASSWORD)
    expect(result.statusCode).toBe(400);
    expect(result.body.name).toBe("SequelizeUniqueConstraintError");
  })

  test("TC-101-5 Gebruiker succesvol geregistreer", async () => {
    let random = Math.random() * 50;
    let result;
    let register = {
      email: random+"@emailors.org",
      password: "Feeeeeeeeeeee",
      firstName: "herman",
      lastName: "last",
      studentNumber: random
    };

    await supertest(app).post("/api/register")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
          console.log(res);
        }
      });
    expect(result.statusCode).toBe(200);
    expect(result.body.result.firstName).toBe("herman");

  })



});
describe("Login Route",  () => {
  test("TC-102-1 Verplicht veld ontbreekt", async () => {
    let result;
    let register = {
      "email": "email@email.org",
    };
    await supertest(app).post("/api/login")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
        }
      });
    expect(result.statusCode).toBe(400)
    expect(result.body.name).toBe("Validation Error");
    expect(result.body.errors[0].message).toBe("Password is Required");
  })

  test("TC-102-2 Invalide email adres", async () => {
    let result;
    let register = {
      "email": "email*email.org",
      "password": "Francois12345",
    };
    await supertest(app).post("/api/login")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
          console.log(res);
        }
      });
    expect(result.statusCode).toBe(400);
    expect(result.body.name).toBe("Validation Error");
    expect(result.body.errors[0].message).toBe("Email isnt a valid email");
  })

  test("TC-102-3 Invalide wachtwoord ", async () => {
    let result;
    let register = {
      "email": "email@email.org",
      "password": "F"
    };
    await supertest(app).post("/api/login")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
        }
      });
    expect(result.statusCode).toBe(400);
    expect(result.body.name).toBe("Validation Error");
    expect(result.body.errors[0].message).toBe("Password Should be longer than 5 characters");
  })

  test("TC-102-4 Gebruiker bestaat niet", async () => {
    let result;
    let register = {
      "email": "eenheelduidelijknietbestaandemail@email.org",
      "password": "Feeeeeeeeeeee",
    };
    await supertest(app).post("/api/login")
      .send(register)
      .then(function(res){
        if (res){
          result = res;
        }
      });
    expect(result.statusCode).toBe(400);
    expect(result.body.name).toBe("Validation");
    expect(result.body.errors[0].message).toBe("No User Found");
  })

  test("TC-102-5 Gebruiker succesvol ingelogd", async () => {
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
    expect(result.statusCode).toBe(200);
    expect(result.body.result.firstName).toBe("herman");

  })



});
