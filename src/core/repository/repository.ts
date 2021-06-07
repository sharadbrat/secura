/**
 * @interface RepositoryRequestParams
 * @public
 */
export interface RepositoryRequestParams {
}


/**
 * @interface RepositorySearchQuery
 * @public
 */
export interface RepositorySearchQuery {
  searchString?: string,
}


/**
 * Generic repository interface. Every time you create a repository, be sure to implement this interface.
 * @interface Repository<Model, ModelId, ModelSearchOptions>
 * @public
 */
export interface Repository<Model, ModelId, ModelSearchOptions = RepositorySearchQuery> {

  /**
   * @method list
   * @param {RepositoryRequestParams} params?
   * @returns Promise<Model[]>
   */
  list?(params?: RepositoryRequestParams): Promise<Model[]>;


  /**
   * @method getById
   * @param {ModelId} id
   * @param {RepositoryRequestParams} params?
   * @returns Promise<Model>
   */
  getById?(id: ModelId, params?: RepositoryRequestParams): Promise<Model>;


  /**
   * @method search
   * @param {ModelSearchOptions} options
   * @param {RepositoryRequestParams} params?
   * @returns Promise<Model[]>
   */
  search?(options: ModelSearchOptions, params?: RepositoryRequestParams): Promise<Model[]>;


  /**
   * @method create
   * @param {Model} model
   * @returns Promise<Model>
   */
  create?(model: Model): Promise<Model>;


  /**
   * @method patch
   * @param {ModelId} id
   * @param {Partial<Model>} model
   * @returns Promise<Model>
   */
  patch?(id: ModelId, model: Partial<Model>): Promise<Model>;


  /**
   * @method update
   * @param {ModelId} id
   * @param {Model} model
   * @returns Promise<Model>
   */
  update?(id: ModelId, model: Model): Promise<Model>;


  /**
   * @method delete
   * @param {ModelId} id
   * @returns Promise<Model>
   */
  delete?(id: ModelId): Promise<Model>;

}
