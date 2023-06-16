import type { AnyRouter, inferRouterOutputs } from '@trpc/server'

export type trpcStub<T extends AnyRouter> = {
  [K in keyof inferRouterOutputs<T>]: {
    returns: (value: inferRouterOutputs<T>[K]) => void
  }
}

export function stubTRPC<T extends AnyRouter, Stub = trpcStub<T>>() {
  return {} as Stub
}
