import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { Prisma } from '@generated-prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const i18n = I18nContext.current(host);
    const request = ctx.getRequest();

    const meta = exception.meta as any;
    const cause = meta?.driverAdapterError?.cause;

    const urlPath = request.url.split('?')[0];
    const pathParts = urlPath.split('/').filter(Boolean);

    const resourceIndex = pathParts[0] === 'api' ? 1 : 0;
    const rawResource:string = pathParts[resourceIndex] || 'App';

    const formattedResource = rawResource
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

    const serviceName = `${formattedResource.replace(/s$/, '')}Service`;

    const dynamicLogger = new Logger(serviceName);

    let status: number | null = null;
    let messageKey: string | null = null;
    let field = '';

      switch (exception.code) {
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        messageKey = 'database.VALUE_TOO_LONG';
        field = (exception.meta as any)?.column_name || 'campo';
        break;
      case 'P2002':
        status = HttpStatus.BAD_REQUEST;
        messageKey = 'database.UNIQUE_CONSTRAINT';
        field = cause?.constraint?.fields?.[0] || 'dato';
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        messageKey = 'database.FOREIGN_KEY_FAIL';
        field = this.extractFieldName(cause?.constraint?.index || '');
        break;
      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        messageKey = 'database.NULL_VIOLATION';
        field =
          (exception.meta as any)?.driverAdapterError?.cause?.constraint
            ?.fields?.[0] || 'campo';
        break;
      case 'P2014':
        status = HttpStatus.CONFLICT;
        messageKey = 'database.RELATION_CONSTRAINT';
        field = this.extractFieldName(cause?.constraint?.index || '');
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        messageKey = 'database.NOT_FOUND';
        break;
    }

    let finalMessage: string;

    if (!messageKey) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      finalMessage = `[Prisma ${exception.code}]: ${exception.message.split('\n').at(-1)}`;
    } else {
      const translatedField = i18n?.t(`database.fields.${field}`) ?? field;
      finalMessage =
        i18n?.t(messageKey, {
          args: { target: translatedField, field: translatedField },
        }) ?? `Error en el campo ${translatedField}`;
    }

    dynamicLogger.error(`[${exception.code}] - ${finalMessage}`, exception.stack);

    response.status(status).json({
      statusCode: status,
      message: [finalMessage],
      error:
        status === 404
          ? 'Not Found'
          : status === 400
            ? 'Bad Request'
            : 'Internal Server Error',
    });
  }

  private extractFieldName(constraintName: string): string {
    if (!constraintName) return 'referencia';
    const parts = constraintName.split('_');
    return parts.length >= 2 ? parts[1] : constraintName;
  }
}
