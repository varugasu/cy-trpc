import type { AnyProcedure, AnyRouter, inferProcedureOutput } from '@trpc/server'
import { createFlatProxy, createRecursiveProxy } from '@trpc/server/shared'

export type TRPCStub<TRouter extends AnyRouter> = {
  [TKey in keyof TRouter['_def']['record']]: TRouter['_def']['record'][TKey] extends infer TRouterOrProcedure
    ? TRouterOrProcedure extends AnyRouter
      ? TRPCStub<TRouterOrProcedure>
      : TRouterOrProcedure extends AnyProcedure
        ? {
            returns: (value: inferProcedureOutput<TRouterOrProcedure>) => void
          } : never
    : never
}

export function stubTRPC<T extends AnyRouter, Stub = TRPCStub<T>>() {
  return createFlatProxy<Stub>((key) => {
    return createRecursiveProxy((opts) => {
      const pathCopy = [key, ...opts.path]
      const lastArg = pathCopy.pop()
      const path = pathCopy.join('.')
      if (lastArg === 'returns') {
        return cy.intercept(`/api/trpc/${path}`, {
          statusCode: 200,
          body: {
            result: {
              data: opts.args[0],
            },
          },
        })
      }
    })
  })
}
