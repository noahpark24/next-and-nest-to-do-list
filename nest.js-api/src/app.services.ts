import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponsesService {
  success(@Res() res: Response, message: string, statusCode?: number) {
    return res.status(statusCode || 200).send({
      message,
    });
  }

  sendAllTasks(@Res() res: Response, tasks: any, statusCode?: number) {
    console.log('soy el type de getAllTasks : ', typeof tasks);
    return res.status(statusCode || 200).send({
      tasks,
    });
  }

  error(@Res() res: Response, message: string | unknown, statusCode?: number) {
    return res.status(statusCode || 500).send({
      error: message,
    });
  }
}
