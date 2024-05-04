export interface MapperRepository<Model> {
  toDomain: (model: unknown) => Model;
}
