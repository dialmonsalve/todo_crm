import { envs } from './envs';

import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

const isProduction = envs.NODE_ENV === 'production';
const APP_NAME = "TODO_CRM_APP"

interface LogInfo extends winston.Logform.TransformableInfo {
  context?: string;
  stack?: string;
}

const cleanStackFormat = (stack: any) => {
  if (!stack) return '';
  const stackStr = String(stack);
  return (
    '\n' +
    stackStr
      .split('\n')
      .filter((line) => !line.trim().startsWith('at '))
      .filter((line) => line.trim() !== '')
      .join('\n')
  );
};

const customFormat = winston.format.printf(
  ({ timestamp, level, context, message, stack }) => {
    const ctx = context ? `[${context}] ` : '';
    const details = cleanStackFormat(stack);
    return `[${timestamp}] ${level.toUpperCase()} ${ctx}${message}${details}`;
  }
);

const databaseFilter = winston.format((info) => {
  const log = info as LogInfo;
  const isDatabase =
    log.context?.endsWith('Service') ||
    (log.message as string)?.includes('Prisma');
  return isDatabase ? info : false;
});

const serverFilter = winston.format((info) => {
  const log = info as LogInfo;
  const isDatabase =
    log.context?.endsWith('Service') ||
    (log.message as string)?.includes('Prisma');
  return isDatabase ? false : info;
});

export const logger = WinstonModule.createLogger({
  transports: [
    ...(!isProduction
      ? [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              winston.format((info) => {
                const { stack, ...rest } = info;
                return rest;
              })(),
              nestWinstonModuleUtilities.format.nestLike(APP_NAME, {
                colors: true,
                prettyPrint: true,
              })
            ),
          }),
        ]
      : []),

    new winston.transports.File({
      filename: 'logs/database-errors.log',
      level: 'error',
      format: winston.format.combine(
        databaseFilter(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
    }),

    new winston.transports.File({
      filename: 'logs/server-errors.log',
      level: 'error',
      format: winston.format.combine(
        serverFilter(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
    }),
  ],
});
