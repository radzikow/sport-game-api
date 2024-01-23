import * as Dataloader from 'dataloader';

export class DataLoaderFactory<T> {
  constructor(
    private service: { findByIds(keys: string[]): Promise<T[]> },
    private mapFn: (item: T) => any,
  ) {}

  createLoader() {
    return new Dataloader<string, T>(async (keys: string[]) => {
      try {
        const entities = (await this.service.findByIds(keys)) || [];
        const entityMap = this.deriveMapFromArray(entities);
        return keys.map((id) => entityMap.get(id));
      } catch (error) {
        console.error('Error in DataLoaderFactory:', error);
        return [];
      }
    });
  }

  private deriveMapFromArray(array: T[]) {
    const map = new Map<any, any>();
    array.forEach((item) => {
      map.set(this.mapFn(item), item);
    });
    return map;
  }
}
