import { post } from '../../data/post';
import * as supertest from 'supertest'
const request = supertest('https://jsonplaceholder.typicode.com/')

describe ("POSTS", () => {
    it("Creat a new post with data file", async() => {
        const res = await request.post('/posts/')
        .send(post).expect(201)
        expect(res.body.title).toBe('new post')
        expect(res.body.body).toBe('post body')
        console.log(res.body, 'response')
    });

    it("Creat a new post with data in test body", async() => {
        const res = await request.post('/posts/')
        .send({
            "userId": 10,
            "title": "new post",
            "body": "post body"
        }).expect(201)
        expect(res.body.title).toBe('new post')
        expect(res.body.body).toBe('post body')
        console.log(res.body, 'response')
    });

});