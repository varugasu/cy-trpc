import type { AnyRouter, inferRouterOutputs } from '@trpc/server'

export type cyTRPCInterceptor<T extends AnyRouter> = inferRouterOutputs<T>

export function stubTRPC() {
  return {}
}
