import { getUser, user } from "../../data/user";
import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");

describe("USER SIGNUP", () => {
  describe("POSITIVE TESTING", () => {
    it.skip("Creat a new user", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);
      expect(res.body.data.user.name).toBe("julia");
      expect(res.body.data.user.email).toBe("jk_pasv13@gmail.com");
      expect(res.body.status).toBe("success");
      console.log(res.body, "response");
    });

    it("Creat a new user using faker", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);
      expect(res.body.data.user.name).toBe(user.name);
      expect(res.body.data.user.email).toBe(user.email.toLowerCase());
      expect(res.body.status).toBe("success");
      console.log(res.body, "response");
    });

    it.only("Creat a new user using faker", function (done) {
      let userImport = getUser();
      const res = request
        .post("/users/signup")
        .send(userImport)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.data.user.name).toBe(userImport.name);
          expect(res.body.data.user.email).toBe(userImport.email.toLowerCase());
          expect(res.body.status).toBe("success");
          console.log(res.body, "response");
          return done();
        });
    });
  });
  describe("POSITIVE TESTING", () => {
    it.only("Creat a new user", async () => {
      const res = await request.post("/users/signup").send(
        {
          name: "Jane Doe",
          email: "jane.doe@gmail.com",
          password: "password123",
          passwordConfirm: "password123",
          role: "admin",
        }
      ).expect(500);
      expect(res.body.message).toBe("E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"jane.doe@gmail.com\" }");
      expect(res.body.status).toBe("error");
      console.log(res.body, "response");
    });
  });
});
