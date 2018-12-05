import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as Joi from 'joi';
import AnimalService from './AnimalService';

class AnimalController {
  public static get URL() {
    return {
      REST_ANIMALS: '/rest/animals',
    };
  }

  public async get() {
    return AnimalService.getAll();
  }

  public async getById(request: Hapi.Request) {
    const animal = await AnimalService.getById(parseInt(request.params.id, 10));
    return (animal) ? animal : Boom.notFound();
  }

  public async post(request: Hapi.Request) {
    const {name} = request.payload as { name: string };
    return AnimalService.save(name);
  }

  public get ROUTES() {
    return [
      {
        method: 'POST',
        path: AnimalController.URL.REST_ANIMALS,
        options: {
          handler: this.post,
          tags: ['api'],
          validate: {
            payload: {
              name: Joi.string().required(),
            },
          },
        },
      },
      {
        method: 'GET',
        path: AnimalController.URL.REST_ANIMALS,
        options: {
          handler: this.get,
          tags: ['api']
        },
      },
      {
        method: 'GET',
        path: `${AnimalController.URL.REST_ANIMALS}/{id}`,
        options: {
          handler: this.getById,
          tags: ['api'],
          validate: {
            params: {
              id: Joi.number().required(),
            },
          },
        },
      }
    ];
  }
}

export default AnimalController;
