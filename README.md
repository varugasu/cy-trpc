<div align="center">
  <h1>Cypress tRPC Interceptor</h1>
<h3>A dynamic Cypress Interceptor for <b>tRPC routers</b>.</h3>

<a href="https://www.npmjs.com/package/cy-trpc">
  <img alt="NPM version" src="https://badge.fury.io/js/cy-trpc.svg"/>
</a>
<a href="https://github.com/vargasmesh/cy-trpc/blob/main/LICENSE">
  <img alt="MIT License" src="https://img.shields.io/github/license/vargasmesh/cy-trpc" />
</a>

</div>



<br />

## Installation

```
ni -D cy-trpc
# pnpm
pnpm add -D cy-trpc
# yarn
yarn add -D cy-trpc
# npm
npm i -D cy-trpc
```



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

## Unstable!

For now, having a intercept is enough for my use case. But I am still figuring out how to make it generic as possible and support several use cases for mocking/stubbing tRPC.

Things on the roadmap:

- Support tRPC config (transformer, base url, links)
- Pass options to `cy.intercept`
- Mock tRPC client
