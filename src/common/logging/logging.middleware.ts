import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const logData = {
        timestamp: new Date(),
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        ip: req.ip,
        userId: (req as any).user?.id,
        responseTime: Date.now() - start,
        userAgent: req.get('user-agent'),
      };

      if (res.statusCode >= 400) {
        // Log detalhado para erros
        this.loggingService.createErrorLog({
          ...logData,
          requestBody: this.sanitizeData(req.body),
          error: this.getErrorMessage(res.statusCode),
        });
      } else {
        // Log básico para requisições bem-sucedidas
        this.loggingService.createSuccessLog(logData);
      }
    });

    next();
  }

  private sanitizeData(data: any): string {
    const sensitiveFields = ['password', 'passwordConfirmation', 'senha', 'confirmarSenha'];
    const sanitized = { ...data };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return JSON.stringify(sanitized);
  }

  private getErrorMessage(statusCode: number): string {
    if (statusCode >= 500) {
      return 'Erro interno do servidor';
    } else if (statusCode >= 400) {
      return 'Erro na requisição do cliente';
    }
    return 'Erro desconhecido';
  }
}
