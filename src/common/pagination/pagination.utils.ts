import { Connection, Edge, PageInfo } from './pagination.types';

export function encodeCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

export function decodeCursor(id: string): string {
  return Buffer.from(id, 'base64').toString('ascii');
}

export function createEdge<T>(node: T, id: string): Edge<T> {
  return {
    node,
    cursor: encodeCursor(id),
  };
}

export async function createConnection<T>(
  items: T[],
  totalCount: number,
  args: { after?: string; before?: string; first?: number; last?: number },
): Promise<Connection<T>> {
  const edges: Edge<T>[] = items.map((item) => createEdge(item, getId(item)));

  const startCursor = edges.length > 0 ? edges[0].cursor : null;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

  const pageInfo: PageInfo = {
    hasNextPage: args.first != null ? totalCount > args.first : false,
    hasPreviousPage: args.last != null ? totalCount > args.last : false,
    startCursor,
    endCursor,
  };

  return {
    totalCount,
    edges,
    pageInfo,
  };
}

export function getId<T>(entity: T): string {
  return (entity as any).id;
}
