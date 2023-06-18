import { createTRPCProxyClient, httpLink } from '@trpc/client'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { stubTRPC } from '../../src'

describe('stubTRPC', () => {
  const t = initTRPC.create({ allowOutsideOfServer: true })
  const router = t.router({
    hello: t.procedure.query(() => 'world'),
    nested: t.router({
      hello: t.procedure.query(() => 'world'),
    }),
  })
  type Router = typeof router

  it('should handle no options passed', async () => {
    const trpcStub = stubTRPC<Router>()

    const client = createTRPCProxyClient<Router>({
      links: [httpLink({ url: '/api/trpc' })],
    })

    trpcStub.hello.returns('interceptor')

    const result = await client.hello.query()
    expect(result).equal('interceptor')
  })

  it('should handle superjson transformer', async () => {
    const trpcStub = stubTRPC<Router>({
      transformer: {
        input: superjson,
        output: superjson,
      },
    })

    const client = createTRPCProxyClient<Router>({
      links: [httpLink({ url: '/api/trpc' })],
    })

    trpcStub.hello.returns('interceptor')

    const result = await client.hello.query()
    expect(result).deep.equal({ json: 'interceptor' })
  })
})
