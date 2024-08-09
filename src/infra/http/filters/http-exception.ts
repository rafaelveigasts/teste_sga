import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

interface ExceptionMessage {
  message: string
  method?: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()
    const error = exception.name

    let message: string | object = 'Internal Server Error'
    let method: string | undefined

    if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const parseMessage = exceptionResponse.message as string

      try {
        const parsedExceptionMessage: ExceptionMessage = JSON.parse(parseMessage)
        method = parsedExceptionMessage.method
        message = parsedExceptionMessage.message
      } catch {
        message = parseMessage
      }
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      error,
      message,
      method,
    })
  }
}
