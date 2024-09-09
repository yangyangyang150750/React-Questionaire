/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './schema/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema }
    ]),
  ],
  exports: [AnswerService],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
