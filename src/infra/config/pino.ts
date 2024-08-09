import { Params } from 'nestjs-pino'

const pinoConfig = (): Params => {
  if (process.env.NODE_ENV === 'production') {
    return {
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
      },
    }
  }

  return {
    pinoHttp: {
      customProps: () => ({
        context: 'HTTP',
      }),
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
          translateTime: true,
          ignore: 'pid,hostname',
        },
      },
    },
  }
}

export default pinoConfig()
