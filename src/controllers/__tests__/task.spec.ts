import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import path from 'path';

import factories from '../../factories';
import { Task } from '../../models';

const server = app.listen();

afterAll(() => server.close());

describe('TaskController', () => {
  describe('List', () => {
    test('should list all tasks', async () => {
      const sampleSize = 3;
      const tasks = factories.task.buildList(sampleSize);
      await Promise.all(
        tasks.map(async (data) => (await User.query().insert(data)).id)
      );

      const response = await request(server).get('/tasks');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Get', () => {
    test('should get a task correctly', async () => {
      const task = factories.task.build();
      const { id } = await task.query().insert(task);

      const response = await request(server).get(`/tasks/${id}`);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(id);
    });

    test("should return 404 if task doesn't exists", async () => {
      const response = await request(server).get(`/tasks/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Create', () => {
    test('should create a new task correctly', async () => {
      const task = factories.task.build();
      const response = await request(server).post(`/task`).send(task);
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.name).toBe(task.name);
    });
  });

  describe('Update', () => {
    test('should update a task correctly', async () => {
      const task = factories.task.build();
      const postResponse = await request(server)
        .post(`/tasks`)
        .send(task);
      expect(postResponse.status).toBe(StatusCodes.CREATED);

      const newtaskData = factories.task.build();
      const putResponse = await request(server)
        .put(`/tasks/${postResponse.body.id}`)
        .send(newtaskData);

      expect(putResponse.status).toBe(StatusCodes.OK);
    });

    test("should return 404 if task doesn't exists", async () => {
      const response = await request(server).put(`/tasks/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Delete', () => {
    test('should delete a task correctly', async () => {
      const task = factories.task.build();
      const { id } = await task.query().insert(task);

      const getResponse = await request(server).get(`/tasks/${id}`);
      expect(getResponse.body.id).toBe(id);

      const deleteResponse = await request(server).delete(`/tasks/${id}`);
      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });

    test("should return 404 if task doesn't exists", async () => {
      const response = await request(server).delete(`/tasks/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
