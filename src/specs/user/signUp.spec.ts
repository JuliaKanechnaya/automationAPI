import {
  getUser,
  user,
  getUserWithEmptyComfirmPass,
  getUserWithEmptyEmail,
  getUserWithEmptyName,
  getUserWithEmptyPass,
  getUserWithNotMatchingComfirmPass,
  getUserWithUnexistingRole,
  getUserWithBothPass,
  enumValues
} from "../../data/user";
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

    it("Creat a new user using faker with data as an obgect and async/await (jest)", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);
      expect(res.body.data.user.name).toBe(user.name);
      expect(res.body.data.user.email).toBe(user.email.toLowerCase());
      expect(res.body.status).toBe("success");
      console.log(res.body, "response");
    });

    it("Creat a new user using faker with data as a function (supertest)", function (done) {
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
  describe.only("NEGATIVE TESTING", () => {
    it("Creat a new user with existing email", async () => {
      const res = await request
        .post("/users/signup")
        .send({
          name: "Jane Doe",
          email: "jane.doe@gmail.com",
          password: "password123",
          passwordConfirm: "password123",
          role: "admin",
        })
        .expect(500);
      expect(res.body.message).toBe(
        'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "jane.doe@gmail.com" }'
      );
      expect(res.body.status).toBe("error");
      console.log(res.body, "response");
    });

    it("Creat a new user with empty name and async/await", async () => {
      let importUserEmptyName = getUserWithEmptyName();
      const res = await request
        .post("/users/signup")
        .send(importUserEmptyName)
        .expect(500);
      console.log(res.body.error, "response");
      expect(res.body.message).toBe(
        "User validation failed: name: Please tell us your name!"
      );
      expect(res.body.error.errors.name.name).toBe("ValidatorError");
      expect(res.body.error.errors.name.message).toBe(
        "Please tell us your name!"
      );
      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.statusCode).toBe(500);
      expect(res.body.error.errors.name.properties.message).toBe(
        "Please tell us your name!"
      );
      expect(res.body.error.errors.name.properties.type).toBe("required");
      expect(res.body.error.errors.name.properties.path).toBe("name");
      expect(res.body.status).toBe("error");
      console.log(res.body, "response");
    });
    it("Creat a new user with empty email and done", function (done) {
      let importUserEmptyEmail = getUserWithEmptyEmail();
      const res = request
        .post("/users/signup")
        .send(importUserEmptyEmail)
        .expect(500)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.status).toBe("error");
          expect(res.body.message).toBe(
            "User validation failed: email: Please provide your email"
          );

          //   expect(res.body.error._message).toBe("User validation failed");
          //   expect(res.body.error.statusCode).toBe(500);
          //   expect(res.body.error.status).toBe("error");
          //   expect(res.body.error.name).toBe("ValidatorError");
          //   expect(res.body.error.message).toBe(
          //     "User validation failed: email: Please provide your email"
          //   );
          console.log(res.body.error.errors, "response");
          return done();
        });
    });

    it("Creat a new user with empty pass and async/await", async () => {
      let importUserEmptyPass = getUserWithEmptyPass();
      const res = await request
        .post("/users/signup")
        .send(importUserEmptyPass)
        .expect(500);
      console.log(res.body.error, "response");

      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe(
        "User validation failed: password: Please provide a password, passwordConfirm: Passwords are not the same!"
      );

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.statusCode).toBe(500);
      expect(res.body.error.status).toBe("error");
      expect(res.body.error.name).toBe("ValidationError");
      expect(res.body.error.message).toBe(
        "User validation failed: password: Please provide a password, passwordConfirm: Passwords are not the same!"
      );

      expect(res.body.error.errors.password.name).toBe("ValidatorError");
      expect(res.body.error.errors.password.message).toBe(
        "Please provide a password"
      );
      expect(res.body.error.errors.password.kind).toBe("required");
      expect(res.body.error.errors.password.path).toBe("password");

      expect(res.body.error.errors.password.properties.message).toBe(
        "Please provide a password"
      );
      expect(res.body.error.errors.password.properties.type).toBe("required");
      expect(res.body.error.errors.password.properties.path).toBe("password");

      //
      expect(res.body.error.errors.passwordConfirm.name).toBe("ValidatorError");
      expect(res.body.error.errors.passwordConfirm.message).toBe(
        "Passwords are not the same!"
      );
      expect(res.body.error.errors.passwordConfirm.kind).toBe("user defined");
      expect(res.body.error.errors.passwordConfirm.path).toBe(
        "passwordConfirm"
      );
      expect(res.body.error.errors.passwordConfirm.value).toBe(
        importUserEmptyPass.passwordConfirm
      );

      expect(res.body.error.errors.passwordConfirm.properties.message).toBe(
        "Passwords are not the same!"
      );
      expect(res.body.error.errors.passwordConfirm.properties.type).toBe(
        "user defined"
      );
      expect(res.body.error.errors.passwordConfirm.properties.path).toBe(
        "passwordConfirm"
      );
      expect(res.body.error.errors.passwordConfirm.properties.value).toBe(
        importUserEmptyPass.passwordConfirm
      );

      console.log(res.body, "response");
    });

    it("Creat a new user with empty confirm pass and async/await", async () => {
      let importUserEmptyConfPass = getUserWithEmptyComfirmPass();
      const res = await request
        .post("/users/signup")
        .send(importUserEmptyConfPass)
        .expect(500);
      console.log(res.body.error, "response");

      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe(
        "User validation failed: passwordConfirm: Please confirm your password"
      );

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.statusCode).toBe(500);
      expect(res.body.error.status).toBe("error");
      expect(res.body.error.name).toBe("ValidationError");
      expect(res.body.error.message).toBe(
        "User validation failed: passwordConfirm: Please confirm your password"
      );

      //
      expect(res.body.error.errors.passwordConfirm.name).toBe("ValidatorError");
      expect(res.body.error.errors.passwordConfirm.message).toBe(
        "Please confirm your password"
      );
      expect(res.body.error.errors.passwordConfirm.kind).toBe("required");
      expect(res.body.error.errors.passwordConfirm.path).toBe(
        "passwordConfirm"
      );

      expect(res.body.error.errors.passwordConfirm.properties.message).toBe(
        "Please confirm your password"
      );
      expect(res.body.error.errors.passwordConfirm.properties.type).toBe(
        "required"
      );
      expect(res.body.error.errors.passwordConfirm.properties.path).toBe(
        "passwordConfirm"
      );

      console.log(res.body, "response");
    });

    it("Creat a new user with BOTH empty pass and async/await", async () => {
      let importUserBothEmptyPass = getUserWithBothPass();
      const res = await request
        .post("/users/signup")
        .send(importUserBothEmptyPass)
        .expect(500);
      console.log(res.body.error, "response");

      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe(
        "User validation failed: password: Please provide a password, passwordConfirm: Please confirm your password"
      );

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.statusCode).toBe(500);
      expect(res.body.error.status).toBe("error");
      expect(res.body.error.name).toBe("ValidationError");
      expect(res.body.error.message).toBe(
        "User validation failed: password: Please provide a password, passwordConfirm: Please confirm your password"
      );

      expect(res.body.error.errors.password.name).toBe("ValidatorError");
      expect(res.body.error.errors.password.message).toBe(
        "Please provide a password"
      );
      expect(res.body.error.errors.password.kind).toBe("required");
      expect(res.body.error.errors.password.path).toBe("password");

      expect(res.body.error.errors.password.properties.message).toBe(
        "Please provide a password"
      );
      expect(res.body.error.errors.password.properties.type).toBe("required");
      expect(res.body.error.errors.password.properties.path).toBe("password");

      //
      expect(res.body.error.errors.passwordConfirm.name).toBe("ValidatorError");
      expect(res.body.error.errors.passwordConfirm.message).toBe(
        "Please confirm your password"
      );
      expect(res.body.error.errors.passwordConfirm.kind).toBe("required");
      expect(res.body.error.errors.passwordConfirm.path).toBe(
        "passwordConfirm"
      );

      expect(res.body.error.errors.passwordConfirm.properties.message).toBe(
        "Please confirm your password"
      );
      expect(res.body.error.errors.passwordConfirm.properties.type).toBe(
        "required"
      );
      expect(res.body.error.errors.passwordConfirm.properties.path).toBe(
        "passwordConfirm"
      );

      console.log(res.body, "response");
    });
    it("Creat a new user with not matching passes and async/await", async () => {
      let importUserNotMatchPass = getUserWithNotMatchingComfirmPass();
      const res = await request
        .post("/users/signup")
        .send(importUserNotMatchPass)
        .expect(500);
      console.log(res.body.error, "response");

      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe(
        "User validation failed: passwordConfirm: Passwords are not the same!"
      );

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.statusCode).toBe(500);
      expect(res.body.error.status).toBe("error");
      expect(res.body.error.name).toBe("ValidationError");
      expect(res.body.error.message).toBe(
        "User validation failed: passwordConfirm: Passwords are not the same!"
      );

      //
      expect(res.body.error.errors.passwordConfirm.name).toBe("ValidatorError");
      expect(res.body.error.errors.passwordConfirm.message).toBe(
        "Passwords are not the same!"
      );
      expect(res.body.error.errors.passwordConfirm.kind).toBe("user defined");
      expect(res.body.error.errors.passwordConfirm.path).toBe(
        "passwordConfirm"
      );
      expect(res.body.error.errors.passwordConfirm.value).toBe(
        importUserNotMatchPass.passwordConfirm
      );

      expect(res.body.error.errors.passwordConfirm.properties.message).toBe(
        "Passwords are not the same!"
      );
      expect(res.body.error.errors.passwordConfirm.properties.type).toBe(
        "user defined"
      );
      expect(res.body.error.errors.passwordConfirm.properties.path).toBe(
        "passwordConfirm"
      );
      expect(res.body.error.errors.passwordConfirm.properties.value).toBe(
        importUserNotMatchPass.passwordConfirm
      );

      console.log(res.body, "response");
    });
    it.only("Creat a new user with non-existing role and async/await", async () => {
      let importUserUnexistRole = getUserWithUnexistingRole();
      const res = await request
        .post("/users/signup")
        .send(importUserUnexistRole)
        .expect(500);
      console.log(res.body.error, "response");
      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe(
        "User validation failed: role: `" + importUserUnexistRole.role + "` is not a valid enum value for path `role`."
      );
    //   expect(res.body.error.errors.name.name).toBe("ValidatorError");
    //   expect(res.body.error.errors.name.message).toBe(
    //     "Please tell us your name!"
    //   );
      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.statusCode).toBe(500);
      expect(res.body.error.name).toBe("ValidationError");
      expect(res.body.error.message).toBe("User validation failed: role: `" + importUserUnexistRole.role + "` is not a valid enum value for path `role`.");

      expect(res.body.error.errors.role.name).toBe(
        "ValidatorError"
      );
      expect(res.body.error.errors.role.message).toBe("`" + importUserUnexistRole.role + "` is not a valid enum value for path `role`.");
      expect(res.body.error.errors.role.kind).toBe("enum");
      expect(res.body.error.errors.role.path).toBe("role");
      expect(res.body.error.errors.role.value).toBe(importUserUnexistRole.role);
      
      expect(res.body.error.errors.role.properties.message).toBe(
        "`" + importUserUnexistRole.role + "` is not a valid enum value for path `role`."
      );
      expect(res.body.error.errors.role.properties.type).toBe("enum");
      expect(res.body.error.errors.role.properties.path).toBe("role");
      expect(res.body.error.errors.role.properties.value).toBe(importUserUnexistRole.role);
      expect(res.body.error.errors.role.properties.enumValues).toEqual(enumValues);
      
      console.log(res.body, "response");
    });
  });
});
