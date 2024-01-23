import { ObjectType, Field, Int, ID, InterfaceType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@InterfaceType()
@ObjectType({ isAbstract: true })
abstract class Node {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
}

@ObjectType({ isAbstract: true })
abstract class Edge<T> {
  @Field(() => Node)
  node: T;

  @Field()
  cursor: string;
}

@ObjectType({ isAbstract: true })
abstract class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor?: string;

  @Field({ nullable: true })
  endCursor?: string;
}

@ObjectType({ isAbstract: true })
abstract class Connection<T> {
  @Field(() => [Edge<T>])
  edges: Edge<T>[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}

export { Node, Edge, Connection, PageInfo };
