import { Model } from 'mongoose';
import { isFunction, omit } from 'radash';
import {
  baseConditionType,
  baseFindOneQueryType,
  baseFindQueryType,
  BaseCreateDto,
  baseServiceReturnType,
  CondtionQuery,
  deleteReturnType,
  findAllReturnType,
  PaginatedDataDto,
  BulkDeleteDto,
} from './base.dto';

export class BaseService<model = never, dto extends BaseCreateDto = never> {
  protected _model: Model<model>;
  protected _softDelete: () => boolean;
  protected _exceptUpdateFields: () => string[];
  protected _fillables: () => string[];
  protected _beforeGetHook: (
    _query: baseFindQueryType<model, dto>,
    condition: baseConditionType,
  ) => Promise<findAllReturnType<dto>>;
  protected _beforeShowHook: (
    _query: baseFindOneQueryType<model, dto>,
  ) => Promise<baseServiceReturnType<dto>>;
  protected _beforeCreateHook: (
    payload: Partial<dto>,
  ) => Promise<baseServiceReturnType<dto>>;
  protected _afterCreateHook: (
    payload: Partial<dto>,
    record: dto,
  ) => Promise<baseServiceReturnType<dto>>;
  protected _beforeUpdateHook: (
    payload: Partial<dto>,
    _id: string,
  ) => Promise<baseServiceReturnType<dto>>;
  protected _afterUpdateHook: (
    payload: Partial<dto>,
    _id: string,
    record: dto,
  ) => Promise<baseServiceReturnType<dto>>;
  protected _beforeDeleteHook: (
    _id: string,
  ) => Promise<baseServiceReturnType<dto>>;
  protected _afterDeleteHook: (
    _id: string,
  ) => Promise<baseServiceReturnType<dto>>;
  protected _populateRelations: (
    query: baseFindOneQueryType<model, dto> | baseFindQueryType<model, dto>,
  ) => void;
  constructor() {}

  /**
   * Retrieves records from the database based on the provided query parameters.
   *
   * @param {CondtionQuery} _query - The query parameters.
   * @return {Promise<PaginatedDataDto<dto> | dto[] | dto | Partial<dto>>} - The retrieved records, count, page count, per page limit, and current page number.
   */
  async findAll(
    _query: CondtionQuery = {},
  ): Promise<PaginatedDataDto<dto> | dto[] | dto | Partial<dto>> {
    const query = this._model.find();
    let response: findAllReturnType<dto>;
    let page: string | number = _query.page;
    let limit: string | number = _query.limit;
    const condition = omit(_query, ['page', 'limit']);
    if (isFunction(this._beforeGetHook))
      response = await this._beforeGetHook(query as any, condition as any);
    if (response) return response;
    limit = typeof limit === 'string' ? parseInt(limit) : limit || 10;
    page = (typeof page === 'string' ? parseInt(page) : page) - 1 || 0;
    if (isFunction(this._populateRelations))
      this._populateRelations(query as never);
    const records = (await query
      .where({ deleted_at: null })
      .select(this._fillables?.() || [])
      .skip(page * limit)
      .limit(limit)
      .exec()) as dto[];
    const count = await this._model.countDocuments(condition);
    return {
      records,
      count,
      pageCount: Math.ceil(count / limit),
      perPage: limit,
      currentPage: page + 1,
    } as PaginatedDataDto<dto>;
  }

  /**
   * Retrieves a document from the database by its ID.
   *
   * @param {string} _id - The ID of the document to retrieve.
   * @return {Promise<dto | Partial<dto> | object>} - A promise that resolves to the retrieved document.
   */
  async findOne(_id: string): Promise<dto | Partial<dto> | object> {
    let response: baseServiceReturnType<dto>;
    const query = this._model.findById(_id);
    if (isFunction(this._beforeShowHook))
      response = await this._beforeShowHook(query as never);
    if (response) return response;
    if (isFunction(this._populateRelations))
      this._populateRelations(query as never);
    return (await query
      .where({ deleted_at: null })
      .select(this._fillables?.() || [])
      .exec()) as dto;
  }

  /**
   * Creates a new record in the database.
   *
   * @param {Partial<dto>} body - The data for the new record.
   * @return {Promise<dto | Partial<dto> | object>} - The created record.
   */
  async create(body: Partial<dto>): Promise<dto | Partial<dto> | object> {
    let response: baseServiceReturnType<dto>;
    if (isFunction(this._beforeCreateHook))
      response = await this._beforeCreateHook(body);
    if (response) return response;
    response = (await this._model.create(body)) as dto;
    if (isFunction(this._afterCreateHook)) {
      await this._afterCreateHook(body, response as dto);
    }
    response = (await this.findOne(response._id)) as dto;
    return response;
  }

  /**
   * Updates a record in the database.
   *
   * @param {string} _id - The ID of the record to update.
   * @param {Partial<dto>} body - The updated data for the record.
   * @return {Promise<dto | Partial<dto> | object>} - The updated record.
   */
  async update(
    _id: string,
    body: Partial<dto>,
  ): Promise<dto | Partial<dto> | object> {
    let response: baseServiceReturnType<dto>;
    if (isFunction(this._beforeUpdateHook))
      response = await this._beforeUpdateHook(body, _id);
    if (response) return response;
    await this._model.findByIdAndUpdate(_id, body as object);
    response = (await this.findOne(_id)) as dto;
    if (isFunction(this._afterUpdateHook)) {
      response = await this._afterUpdateHook(body, _id, response as dto);
      if (response) return response;
    }
    return response as dto;
  }

  /**
   * Deletes a record from the database.
   *
   * @param {string} _id - The ID of the record to delete.
   * @return {Promise<deleteReturnType>} - The deleted record's ID.
   */
  /**
   * Deletes a record from the database.
   *
   * @param {Request} _request - The request object.
   * @param {string} _id - The ID of the record to delete.
   * @return {Promise<{_id?: string}>} - The deleted record's ID.
   */
  async remove(
    _id: string,
    _body?: BulkDeleteDto,
  ): Promise<{ _id?: string | string[] }> {
    let softDelete = true;
    if (_id === 'bulk') {
      const record = await this.getByIds(_body['_ids']);
      if (isFunction(this._beforeDeleteHook)) {
        await this._beforeDeleteHook(_id as string);
      }
      if (isFunction(this._softDelete)) softDelete = this._softDelete();
      if (softDelete === false) {
        await this._model.deleteMany({
          _id: { $in: _body['_ids'] },
        });
      } else {
        await this._model.deleteMany(
          { _id: { $in: _body['_ids'] } },
        );
      }
      if (isFunction(this._afterDeleteHook)) {
        await this._afterDeleteHook(_id as string);
      }
      return { _id: record?.map?.((r: any) => r._id) };
    } else {
      const record = await this.findOne(_id as string);
      if (isFunction(this._beforeDeleteHook)) {
        await this._beforeDeleteHook(_id as string);
      }
      if (isFunction(this._softDelete)) softDelete = this._softDelete();
      if (softDelete === false) {
        await this._model.findByIdAndDelete(_id);
      } else {
        await this._model.findByIdAndUpdate(_id, { deleted_at: new Date() });
      }
      if (isFunction(this._afterDeleteHook)) {
        await this._afterDeleteHook(_id as string);
      }
      // @ts-expect-error overwrite ids
      return { _id: record?._id };
    }
  }

  /**
   * Retrieves a document from the database by its ID.
   *
   * @param {Request} _request - The request object.
   * @param {string} _id - The ID of the document to retrieve.
   * @return {Promise<any>} - A promise that resolves to the retrieved document.
   */
  async getByIds(_id: string[]): Promise<any[]> {
    const query = this._model.find({ _id: { $in: _id } });
    return await query
      .where({ deleted_at: null })
      .select(this._fillables?.() || [])
      .exec();
  }

  /**
   * Finds multiple records in the database matching the specified condition.
   *
   * @param {object} condition - The condition used to filter records.
   * @param {string[]} [select=this._fillables()] - An array of fields to include in the result set.
   * @return {Promise<dto[]>} - A promise that resolves to an array of records matching the condition.
   */

  async findRecords(
    condition: object,
    select: string[] = this._fillables(),
  ): Promise<dto[]> {
    const _query = this._model
      .find(condition)
      .select(select)
      .sort({ created_at: -1 });
    if (isFunction(this._populateRelations))
      this._populateRelations(_query as never);
    return (await _query.exec()) as dto[];
  }

  /**
   * Finds a single record in the database matching the specified condition.
   *
   * @param {object} condition - The condition used to filter records.
   * @param {string[]} [select=this._fillables()] - An array of fields to include in the result set.
   * @return {Promise<dto>} - A promise that resolves to the record matching the condition or null.
   */
  async findOneRecord(
    condition: object,
    select: string[] = this._fillables(),
  ): Promise<dto> {
    const _query = this._model.findOne(condition).select(select);
    if (isFunction(this._populateRelations))
      this._populateRelations(_query as never);
    return (await _query.exec()) as dto;
  }

  /**
   * Creates a new record in the database.
   *
   * @param {Partial<dto>} body - The data for the new record.
   * @return {Promise<dto>} - The created record.
   */
  async createRecord(body: Partial<dto>): Promise<dto> {
    const record = await this._model.create(body);
    return await this.findOneRecord({ _id: record._id });
  }

  /**
   * Updates a record in the database.
   *
   * @param {object} condition - The condition used to filter records.
   * @param {Partial<dto>} body - The data for the updated record.
   * @return {Promise<dto>} - The updated record.
   */
  async updateRecord(condition: object, body: Partial<dto>): Promise<dto> {
    await this._model.findOneAndUpdate(condition, body as object);
    return await this.findOneRecord({ condition });
  }

  /**
   * Deletes a record from the database.
   *
   * If the `_softDelete` option is set to true, the record is not deleted but
   * instead it's `deleted_at` field is set to the current date and time.
   *
   * @param {object} condition - The condition used to filter records.
   * @return {Promise<boolean>} - A promise that resolves to true if the record is deleted, false otherwise.
   */
  async deleteRecord(condition: object): Promise<boolean> {
    let softDelete = true;
    if (isFunction(this._softDelete)) softDelete = this._softDelete();
    if (softDelete === false) await this._model.findOneAndDelete(condition);
    else
      await this._model.findOneAndUpdate(
        { condition },
        { $set: { deleted_at: new Date() } },
      );
    return true;
  }
}
