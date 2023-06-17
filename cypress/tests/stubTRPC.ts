import { createTRPCProxyClient, httpLink } from '@trpc/client'
import { initTRPC } from '@trpc/server'
import { stubTRPC } from '../../src'

describe('stubTRPC', () => {
  it('should work', async () => {
    const t = initTRPC.create({ allowOutsideOfServer: true })
    const router = t.router({
      hello: t.procedure.query(() => 'world'),
      nested: t.router({
        hello: t.procedure.query(() => 'world'),
      }),
    })
    type Router = typeof router
    const trpcStub = stubTRPC<Router>()

    const client = createTRPCProxyClient<Router>({
      links: [httpLink({ url: '/api/trpc' })],
    })

    trpcStub.hello.returns('world')

    const result = await client.hello.query()
    expect(result).equal('world')
  })
})
