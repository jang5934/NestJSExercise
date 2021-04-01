import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, MiddlewareBuilder } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard'
import { LoggingMiddleware } from './middleware/logging.middleware';
@Module({
    imports: [ConfigModule],
    providers: [{
        provide: APP_GUARD,
        useClass: ApiKeyGuard
    }],    
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareBuilder) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
