# Cypress TRPCStub

<p align='center'>
A dynamic Cypress Interceptor for <b>tRPC routers</b>.
</p>


## No need to run a server

### Define your router

```ts
const t = initTRPC.create({ allowOutsideOfServer: true })
const router = t.router({
  hello: t.procedure.query(() => 'world'),
})
```

### Create the stub

```ts
const trpcStub = stubTRPC<Router>()

trpcStub.hello.returns('interceptor')
```

### Test it!

```ts
const client = createTRPCProxyClient<Router>({
  links: [httpLink({ url: '/api/trpc' })],
})

const result = await client.hello.query()
expect(result).equal('interceptor')
```
