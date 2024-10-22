import { user } from '../../data/user';
import * as supertest from 'supertest'
const request = supertest('localhost:8001/api/v1')

describe ("USER SIGNUP", () => {
    it("Creat a new user", async() => {
        const res = await request.post('/users/signup')
        .send(user).expect(201)
        expect(res.body.data.user.name).toBe("julia")
        expect(res.body.data.user.email).toBe("jk_pasv5@gmail.com")
        expect(res.body.status).toBe('success')
        console.log(res.body, 'response')
    });

});