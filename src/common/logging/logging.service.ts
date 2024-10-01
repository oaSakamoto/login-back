import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoggingService {
  constructor(private prisma: PrismaService) {}

  async createSuccessLog(logData: {
    timestamp: Date;
    method: string;
    url: string;
    statusCode: number;
    ip?: string;
    userId?: string;
    responseTime: number;
    userAgent?: string;
  }) {
    return this.prisma.mongo.log.create({
      data: {
        ...logData,
        isError: false,
      },
    });
  }

  async createErrorLog(logData: {
    timestamp: Date;
    method: string;
    url: string;
    statusCode: number;
    ip?: string;
    userId?: string;
    responseTime: number;
    userAgent?: string;
    requestBody?: string;
    error?: string;
  }) {
    return this.prisma.mongo.log.create({
      data: {
        ...logData,
        isError: true,
      },
    });
  }
}
