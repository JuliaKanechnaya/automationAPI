import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { getUser } from "../../data/user";
import {
  deleteFunction,
  logIn,
  logIn2,
  signUp,
  signUp2,
} from "../../data/helpers";

describe("LOGIN", () => {
  describe("POSITIVE TESTING", () => {
    let userImport = getUser();
    let cookie: [x: string];
    beforeEach(async () => {
      await signUp(userImport);
    });

    it.skip("Login with correct data", async () => {
      await logIn({
        email: userImport.email,
        password: userImport.password,
      }).then((response) => {
        console.log(response.body);
        expect(response.body.status).toBe("success");
        expect(response.body.data.user.role).toBe("admin");
      });
    });
    it("Login with correct data", async () => {
      let resLogin = await logIn({
        email: userImport.email,
        password: userImport.password,
      });
      // console.log(resLogin);
      expect(resLogin.body.status).toBe("success");
      expect(resLogin.body.data.user.role).toBe("admin");
      // let resDelete = request.delete("/users/DeleteMe").set("Cookie", "");
      cookie = resLogin.headers["set-cookie"];
      let deleteData = await deleteFunction(cookie[0]);
      expect(deleteData.status).toBe(200);
      expect(deleteData.body.status).toBe("success");
      expect(deleteData.body.message).toBe("User deleted successfully");
    });
  });
  describe("NEGATIVE TESTING", () => {
    let userImport = getUser();
    it("Login with wrong email", async () => {
      logIn({
        email: userImport.email,
        password: userImport.password,
      }).then((el) => {
        // console.log(el.body, 'response');
        expect(el.body.status).toBe("fail");
        expect(el.body.message).toBe("Incorrect email or password");
      });
    });
    it.only("Cannot delete user with invalid token", async () => {
      // let resLogin = await loginTours({
      //   email: userImport.email,
      //   password: userImport.password,
      // });
      // // console.log(resLogin);
      // expect(resLogin.body.status).toBe("success");
      // expect(resLogin.body.data.user.role).toBe("admin");
      // // let resDelete = request.delete("/users/DeleteMe").set("Cookie", "");
      // cookie = resLogin.headers["set-cookie"];
      // let deleteData = await deleteFunction(cookie[0]);
      // expect(deleteData.status).toBe(200);
      // expect(deleteData.body.status).toBe("success");
      // expect(deleteData.body.message).toBe("User deleted successfully");
    });
    it.only("Cannot delete user with empty token", async () => {
      // let resLogin = await loginTours({
      //   email: userImport.email,
      //   password: userImport.password,
      // });
      // // console.log(resLogin);
      // expect(resLogin.body.status).toBe("success");
      // expect(resLogin.body.data.user.role).toBe("admin");
      // // let resDelete = request.delete("/users/DeleteMe").set("Cookie", "");
      // cookie = resLogin.headers["set-cookie"];
      // let deleteData = await deleteFunction(cookie[0]);
      // expect(deleteData.status).toBe(200);
      // expect(deleteData.body.status).toBe("success");
      // expect(deleteData.body.message).toBe("User deleted successfully");
    });
    
  });
});
