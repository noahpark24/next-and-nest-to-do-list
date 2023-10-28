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
    return res.status(statusCode || 200).send({
      tasks,
    });
  }

  error(@Res() res: Response, error: Error | string, statusCode?: number) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(statusCode || 500).send({
      error: errorMessage,
    });
  }
}
