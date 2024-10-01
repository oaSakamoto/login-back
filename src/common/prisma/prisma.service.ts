import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaClientPostgres } from '../../../prisma/generate/postgres';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private postgresClient: PrismaClientPostgres;

  constructor() {
    this.postgresClient = new PrismaClientPostgres();
  }

  async onModuleInit() {
    await this.postgresClient.$connect();
  }

  async onModuleDestroy() {
    await this.postgresClient.$disconnect();
  }

  get postgres() {
    return this.postgresClient;
  }
}
