import request from 'supertest';
import app from './app';

// Test server to ensure it runs
describe('Test Express App', () => {
  it('should respond with a 200 status on the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Test /api/themes route
  it('should return a list of themes from /api/themes', async () => {
    const response = await request(app).get('/api/themes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test /api/artists route
  it('should return a list of artists from /api/artists', async () => {
    const response = await request(app).get('/api/artists');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // assuming it's a list
  });

  // Test invalid route
  it('should return a 404 for invalid routes', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
  });

  // Test POST request to /api/artists
  it('should create a new artist', async () => {
    const newArtist = {
      Name: 'Daniel Penny'
    };
    const response = await request(app)
      .post('/api/artists')
      .send(newArtist)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newArtist.Name);
  });

  // Test UPDATE (PUT) requests to /api/artists
  it('should update an artist', async () => {
    const updatedArtist = {
      Name: 'Updated Artist'
    };
    const response = await request(app)
      .patch('/api/artists/1') // Update artist with ID 1
      .send(updatedArtist)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedArtist.name);
  });

  // Test DELETE request to /api/artists - Delete taken out because it would result in an error after first run
  // it('should delete an artist', async () => {
  //   const response = await request(app).delete('/api/artists/285'); // Assuming 1 is a valid artist ID
  //   expect(response.status).toBe(200);
  // });
});
