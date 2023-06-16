import { assertType, beforeEach, test, vi } from 'vitest'
import type { inferRouterOutputs } from '@trpc/server'
import { initTRPC } from '@trpc/server'

import { stubTRPC } from '../src/index'

vi.stubGlobal('cy', {
  intercept: vi.fn(),
})

test('stubTRPC', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  const t = initTRPC.create()
  const router = t.router({
    hello: t.procedure.query(() => 'word'),
  })

  type Router = typeof router

  const trpcStub = stubTRPC<Router>()

  assertType<inferRouterOutputs<Router>>(trpcStub)
})
