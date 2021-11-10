import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aeropuerto, AeropuertoRelations, Ruta} from '../models';
import {RutaRepository} from './ruta.repository';

export class AeropuertoRepository extends DefaultCrudRepository<
  Aeropuerto,
  typeof Aeropuerto.prototype.id,
  AeropuertoRelations
> {

  public readonly origenFk: BelongsToAccessor<Ruta, typeof Aeropuerto.prototype.id>;

  public readonly destino_aweopuerto: BelongsToAccessor<Ruta, typeof Aeropuerto.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RutaRepository') protected rutaRepositoryGetter: Getter<RutaRepository>,
  ) {
    super(Aeropuerto, dataSource);
    this.destino_aweopuerto = this.createBelongsToAccessorFor('destino_aweopuerto', rutaRepositoryGetter,);
    this.registerInclusionResolver('destino_aweopuerto', this.destino_aweopuerto.inclusionResolver);
    this.origenFk = this.createBelongsToAccessorFor('origenFk', rutaRepositoryGetter,);
    this.registerInclusionResolver('origenFk', this.origenFk.inclusionResolver);
  }
}
