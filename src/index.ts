import type { AnyRouter, inferRouterOutputs } from '@trpc/server'

export type trpcStub<T extends AnyRouter> = inferRouterOutputs<T>

export function stubTRPC<T extends AnyRouter, Stub = trpcStub<T>>() {
  return {} as Stub
}
