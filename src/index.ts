import type { AnyProcedure, AnyRouter, inferProcedureOutput } from '@trpc/server'

export type trpcStub<TRouter extends AnyRouter> = {
  [TKey in keyof TRouter['_def']['record']]: TRouter['_def']['record'][TKey] extends infer TRouterOrProcedure
    ? TRouterOrProcedure extends AnyRouter
      ? trpcStub<TRouterOrProcedure>
      : TRouterOrProcedure extends AnyProcedure
        ? {
            returns: (value: inferProcedureOutput<TRouterOrProcedure>) => void
          } : never
    : never
}

export function stubTRPC<T extends AnyRouter, Stub = trpcStub<T>>() {
  return {} as Stub
}
