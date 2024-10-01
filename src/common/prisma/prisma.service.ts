import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaClientPostgres } from '../../../prisma/generate/postgres';
import { PrismaClient as PrismaClientMongoDB } from '../../../prisma/generated/mongodb';
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private postgresClient: PrismaClientPostgres;
  private mongoClient: PrismaClientMongoDB;
  constructor() {
    this.postgresClient = new PrismaClientPostgres();
    this.mongoClient = new PrismaClientMongoDB();
  }

  async onModuleInit() {
    await this.postgresClient.$connect();
    await this.mongoClient.$connect();
  }

  async onModuleDestroy() {
    await this.postgresClient.$disconnect();
    await this.mongoClient.$disconnect();
  }

  get postgres() {
    return this.postgresClient;
  }

  get mongo() {
    return this.mongoClient;
  }
}
