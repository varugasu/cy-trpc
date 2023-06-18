import { type AnyProcedure, type AnyRouter, type CombinedDataTransformer, defaultTransformer, type inferProcedureOutput } from '@trpc/server'
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

interface StubOptions {
  transformer?: CombinedDataTransformer
}

export function stubTRPC<T extends AnyRouter, Stub = TRPCStub<T>>(options?: StubOptions) {
  const transformer = options?.transformer ?? defaultTransformer

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
              data: transformer.output.serialize(opts.args[0]),
            },
          },
        })
      }
    })
  })
}
