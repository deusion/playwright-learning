import { test, expect } from '@playwright/test';


test.describe('API Testing with ReqRes.in', () => {

    //Consts to make URLs and Headers easier to use
    const API_URL = 'https://reqres.in/api';
    const API_HEADER = { 'x-api-key': 'reqres-free-v1' };

    test('POST returns 201 - successfully created', async ({ request }) => {

        const response = await request.post(`${API_URL}/users`, {
            headers: API_HEADER,
            data: {
                name: 'Div',
                job: 'qa'
            }
        });

        //Expect a 201 i.e successful creation
        expect(response.status()).toBe(201);

        const user = await response.json();
        // Validate type of response fields
        expect(typeof user.id).toBeDefined();
        expect(typeof user.name).toBe('string');
        expect(typeof user.job).toBe('string');

        // Validate value is the same as our initial entry
        expect(user.name).toBe('Div');
        expect(user.job).toBe('qa');
    });

    test('POST returns 201 or 400 w empty field', async ({ request }) => {
        const response = await request.post(`${API_URL}/users`, {
            headers: API_HEADER,
            data: {
                name: '',
                job: 'qa',
            }
        });

        //We either expect it to reject it (400) or accept (201) the entry
        expect([400, 201]).toContain(response.status());
        const user = await response.json();
        //We validate the responses
        expect(user.job).toBe('qa');
    });

    test('POST many users concurrently to check race conditions', async ({ request }) => {
        const responses = await Promise.all([
            request.post(`${API_URL}/users`, {
                headers: API_HEADER,
                data: { name: 'div', job: 'qa' }
            }),
            request.post(`${API_URL}/users`, {
                headers: API_HEADER,
                data: { name: 'jag', job: 'qa' }
            }),
            request.post(`${API_URL}/users`, {
                headers: API_HEADER,
                data: { name: 'john', job: 'prog' }
            })
        ]);
        //We make sure all of them are correctly made
        responses.forEach(response => {
            expect(response.status()).toBe(201);
        });

        //We extract all the IDs from the responses and verify they are unique
        const users = await Promise.all(responses.map(r => r.json()));
        const ids = users.map(u => u.id);
        expect(new Set(ids).size).toBe(3);

    });

    test('GET a non-existing user to return 404', async ({ request }) => {
        const response = await request.get(`${API_URL}/users/999`, {
            headers: API_HEADER,
        });
        expect(response.status()).toBe(404);
    });

    test('PUT operation returns 200', async ({ request }) => {
        const response = await request.put(`${API_URL}/users/1`, {
            headers: API_HEADER,
            data: {
                name: 'Jesse'
            }
        });
        expect(response.status()).toBe(200);
        const user = await response.json();
        expect(user.name).toBe('Jesse');
    });

    test('DELETE a user returns 204', async ({ request }) => {
        const resposne = await request.delete(`${API_URL}/users/1`, {
            headers: API_HEADER,
        });
        expect(resposne.status()).toBe(204);
    });
});
