import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { CategoryModule } from './category/category.module';
import { QuizModule } from './quiz/quiz.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CoreModule,
    QuestionModule,
    AnswerModule,
    CategoryModule,
    QuizModule,
    CommonModule,
    UserModule,
    AuthModule,
    
  ],
})
export class AppModule {}
