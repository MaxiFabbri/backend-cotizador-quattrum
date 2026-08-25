import GenericRepository from "./GenericRepository.js";

export default class UtilityTableRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
  // Por ahora no agregamos nada extra.
  // Si mañana necesitás algo específico (ej. buscar por temporada),
  // lo definís acá como un método adicional.
}
