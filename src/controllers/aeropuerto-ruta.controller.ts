import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aeropuerto,
  Ruta,
} from '../models';
import {AeropuertoRepository} from '../repositories';

export class AeropuertoRutaController {
  constructor(
    @repository(AeropuertoRepository)
    public aeropuertoRepository: AeropuertoRepository,
  ) { }

  @get('/aeropuertos/{id}/ruta', {
    responses: {
      '200': {
        description: 'Ruta belonging to Aeropuerto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ruta)},
          },
        },
      },
    },
  })
  async getRuta(
    @param.path.string('id') id: typeof Aeropuerto.prototype.id,
  ): Promise<Ruta> {
    return this.aeropuertoRepository.origenFk(id);
  }
}
