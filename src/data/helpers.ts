import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
export  function signUp2(user: string | object | undefined){
    return  request.post("/users/signup").send(user)
}

// export async function signUp(user: string | object | undefined){
//     return await request.post("/users/signup").send(user)
// }

export function signUp(user: string | object | undefined): Promise<any>{
  return new Promise((resolve, reject) => {
    request
      .post("/users/signup")
      .send(user)
      .end((err, res) => {
        if (err) return reject(err);
        else resolve(res);
      });
  });
}

export function deleteFunction(cookie: string): Promise<any>{
  return new Promise((resolve, reject) => {
    request
      .delete("/users/deleteMe")
      .set("Cookie", cookie)
      .end((err, res) => {
        if (err) return reject(err);
        else resolve(res);
      });
  });
}

export async function deleteFunction2(cookie: string) {
  return await request.delete("/users/deleteMe").set("Cookie", cookie);
}

export async function logIn(user: string | object | undefined) {
  return await request.post("/users/login").send(user);
}


export function loginTours(user: string | object | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
        request
          .post("/users/login")
          .send(user)
          .end((err, res) => {
            if (err) return reject(err);
            else resolve(res);
          });
      });
}