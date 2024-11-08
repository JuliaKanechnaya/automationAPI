import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { getUser } from "../../data/user";
import { logIn, logIn2, signUp, signUp2 } from "../../data/helpers";

describe("LOGIN", () => {
  describe("POSITIVE TESTING", () => {
    let userImport = getUser();
    it.skip("Login with correct data", async () => {
      //const res = await request.post("/users/signup").send(userImport).expect(201);
      // const res = await
      signUp(userImport).then((el) => {
        expect(el.body.status).toBe("success");
        logIn2({
          email: userImport.email,
          password: userImport.password,
        }).then((el2) => {
          expect(el2.body.status).toBe("success");
        });
      });
      // console.log(res.body, 'res')
      // const loginRes = await request.post("/users/login").send({
      //     email: userImport.email,
      //     password: userImport.password,
      // }).expect(200);
      // const loginRes = await
    });

    it("Login with correct data and login function with Promise", async () => {
      signUp(userImport).then((el) => {
        expect(el.body.status).toBe("success");
        logIn({
          email: userImport.email,
          password: userImport.password,
        }).then((el2) => {
          expect(el2.body.status).toBe("success");
        });
      });
    });

    it("Login with correct data and try and catch", async () => {
      try {
        await signUp(userImport).then(async (el) => {
          expect(el.body.status).toBe("success");
          await logIn({
            email: userImport.email,
            password: userImport.password,
          }).then((el2) => {
            expect(el2.body.status).toBe("success");
            console.log(el2.body, "response");
          });
        });
      } catch (error) {
        console.log("erroe during login", error);
        //   throw error;
      }
    });

    it("Login with correct data using then", async () => {
      await signUp(userImport).then((res) => {
        expect(res.body.status).toBe("success");
        return logIn({
          email: userImport.email,
          password: userImport.password,
        })
          .then((res2) => {
            expect(res2.statusCode).toBe(201);
            console.log(res2.body, "response");
          })
          .catch((err) => {
            console.log("Error during login", err);
            // throw error;
          });
      });
    });
    it("Login with correct data using end wothout Promise", (done) => {
      signUp2(userImport).end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe("success");
        done();
      });
    });
    it.only("Login with correct data using end wothout Promise", (done) => {
        signUp2(userImport).end((err, res) => {
          if (err) return done(err);
          expect(res.body.status).toBe("success");
          done();
        });
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
    it("Login with wrong password", () => {
      signUp(userImport).then((el) => {
        expect(el.body.status).toBe("success");
        logIn({
          email: userImport.email,
          password: userImport.password + "1",
        }).then((el2) => {
          // console.log(el2.body, 'response');
          expect(el2.body.status).toBe("fail");
          expect(el2.body.message).toBe("Incorrect email or password");
        });
      });
    });
    it("Login with empty password", async () => {
      logIn({
        email: userImport.email,
        password: "",
      }).then((el2) => {
        // console.log(el2.body, "response");
        expect(el2.body.status).toBe("fail");
        expect(el2.body.message).toBe("Please provide email and password!");
      });
    });
    it("Login with empty email", async () => {
      logIn({
        email: "",
        password: userImport.password,
      }).then((el2) => {
        //   console.log(el2.body, "response");
        expect(el2.body.status).toBe("fail");
        expect(el2.body.message).toBe("Please provide email and password!");
      });
    });
    it("Login with empty email format", async () => {
      logIn({
        email: "email@",
        password: userImport.password,
      }).then((el2) => {
        //   console.log(el2.body, "response");
        expect(el2.body.status).toBe("fail");
        expect(el2.body.message).toBe("Incorrect email or password");
      });
    });
  });
});
