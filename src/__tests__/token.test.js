const {signToken,returnTokenUser, validateToken} = require("../services/token");
describe("Token Service", () => {
  test("Should verify Valid Token", () => {
    const token = signToken({name:"test"})
    let result;

    result = validateToken(token);

    expect(result).toEqual(true);
  })
  test("Shouldnt verify invalid Token", () => {
    const token = "obviously not a token"
    let result;


    result = validateToken(token);

    expect(result).toEqual(false);
  })

  test("Shouldnt verify null Token", () => {
    const token = null;
    let result;


    result = validateToken(token);

    expect(result).toEqual(false);
  })

  test("Should get object from valid token", () => {
    const token = signToken({_id:"Not Syke" ,name:"test"});
    let result;


    result =  returnTokenUser(token)
    expect(result.user).toEqual({_id:"Not Syke" ,name:"test"});
  })

  test("Should get fake object from invalid token", () => {
    const token = "obviously not a token"
    let result;


    result =  returnTokenUser(token)
    expect(result.user).toBeUndefined();
  })

  test("Shouldnt get object from null token", () => {
    const token = null
    let result;


    result =  returnTokenUser(token)
    expect(result.user).toBeUndefined();
  })

});
