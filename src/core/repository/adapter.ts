/**
 * Generic adapter. Make sure all adapters extend this class.
 * @interface RepositoryAdapter
 * @public
 */
export abstract class RepositoryAdapter<Model, ModelDTO, CreateDTO = ModelDTO, PatchDTO = ModelDTO> {

  // DESERIALIZERS

  /**
   * Basic deserialize method. Must be defined in child class.
   * @method deserialize
   * @param {ModelDTO} dto
   * @returns Model
   * @abstract
   * @public
   */
  public abstract deserialize(dto: ModelDTO): Model;

  /**
   * @method deserializeList
   * @param {ModelDTO[]} dtoList
   * @returns Model[]
   * @public
   */
  public deserializeList(dtoList: ModelDTO[]): Model[] {
    return (dtoList || []).map(el => this.deserialize(el));
  }

  // SERIALIZERS

  /**
   * Basic serialize method. Must be defined in child class.
   * @method serialize
   * @param {Partial<Model>} model
   * @returns ModelDTO
   * @abstract
   * @public
   */
  public abstract serialize(model: Partial<Model>): ModelDTO;

  /**
   * @method serializeList
   * @param {Model[]} modelList
   * @returns ModelDTO[]
   * @public
   */
  public serializeList(modelList: Model[]): ModelDTO[] {
    return (modelList || []).map(el => this.serialize(el));
  }

  /**
   * Uses `serialize` by default.
   * @method serializeForCreate<CreateDTO extends ModelDTO | any>
   * @param {Partial<Model>} model
   * @returns CreateDTO
   * @public
   */
  public serializeForCreate(model: Partial<Model>): CreateDTO {
    return this.serialize(model) as unknown as CreateDTO;
  }

  /**
   * Uses `serialize` by default.
   * @method serializeForPatch<PatchDTO extends ModelDTO | any>
   * @param {Partial<Model>} model
   * @returns PatchDTO
   * @public
   */
  public serializeForPatch(model: Partial<Model>): PatchDTO {
    return this.serialize(model) as unknown as PatchDTO;
  }

}
