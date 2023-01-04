import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import path from 'path';

import factories from '../../factories';
import { Project } from '../../models';

const server = app.listen();

afterAll(() => server.close());

describe('ProjectController', () => {
  describe('List', () => {
    test('should list all projects', async () => {
      const sampleSize = 3;
      const projects = factories.project.buildList(sampleSize);
      await Promise.all(
        projects.map(async (data) => (await User.query().insert(data)).id)
      );

      const response = await request(server).get('/projects');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Get', () => {
    test('should get a project correctly', async () => {
      const project = factories.project.build();
      const { id } = await Project.query().insert(project);

      const response = await request(server).get(`/projects/${id}`);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(id);
    });

    test("should return 404 if project doesn't exists", async () => {
      const response = await request(server).get(`/projects/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Create', () => {
    test('should create a new project correctly', async () => {
      const project = factories.project.build();
      const response = await request(server).post(`/project`).send(project);
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.name).toBe(project.name);
    });
  });

  describe('Update', () => {
    test('should update a project correctly', async () => {
      const project = factories.project.build();
      const postResponse = await request(server)
        .post(`/projects`)
        .send(project);
      expect(postResponse.status).toBe(StatusCodes.CREATED);

      const newprojectData = factories.project.build();
      const putResponse = await request(server)
        .put(`/projects/${postResponse.body.id}`)
        .send(newprojectData);

      expect(putResponse.status).toBe(StatusCodes.OK);
    });

    test("should return 404 if project doesn't exists", async () => {
      const response = await request(server).put(`/projects/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Delete', () => {
    test('should delete a project correctly', async () => {
      const project = factories.project.build();
      const { id } = await project.query().insert(project);

      const getResponse = await request(server).get(`/projects/${id}`);
      expect(getResponse.body.id).toBe(id);

      const deleteResponse = await request(server).delete(`/projects/${id}`);
      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });

    test("should return 404 if project doesn't exists", async () => {
      const response = await request(server).delete(`/projects/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
