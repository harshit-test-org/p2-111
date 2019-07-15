# Introduction

This is a reproduction for https://github.com/prisma/prisma2/issues/111

# Version

prisma2@2.0.0-alpha.5, binary version: 30a33bde5b1d9f79e0a48491749528da76002e24

# To Reproduce

1. Clone and run yarn prisma2 dev
2. Run prisma2 start
3. Run the mutations(Fill IDs that you retieve)

```graphql
mutation {
  createOnePassType(data: { name: "First Pass" }) {
    id
    name
  }
}
```

```graphql
mutation {
  createOneEventType(
    data: {
      name: "Level 1"
      allowedPassTypes: { connect: [{ id: "cjy4b5qcr000043ycoa89m1fc" }] }
    }
  ) {
    id
    name
  }
}
```

```graphql
mutation {
  updateOneEventType(
    data: {
      name: "Level 1"
      allowedPassTypes: { set: [{ id: "cjy4b5qcr000043ycoa89m1fc" }] }
    }
    where: { id: "cjy4b66sw000143yc2xsvaj23" }
  ) {
    id
  }
}
```

## Backtrace

```
thread 'arbiter:291ffe28-ca3e-41eb-a53f-faf1bfc48ff3:actix-net-worker-5' panicked at 'Unable to make Object({"id": String("cjy4b5qcr000043ycoa89m1fc")}) to PrismaValue', prisma-models/src/prisma_value.rs:79:22
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.
stack backtrace:
   0: std::sys::unix::backtrace::tracing::imp::unwind_backtrace
   1: std::sys_common::backtrace::_print
   2: std::panicking::default_hook::{{closure}}
   3: std::panicking::default_hook
   4: std::panicking::rust_panic_with_hook
   5: std::panicking::begin_panic
   6: prisma_models::prisma_value::PrismaValue::from_value_broken
   7: <core::iter::adapters::Map<I,F> as core::iter::traits::iterator::Iterator>::fold
   8: <alloc::vec::Vec<T> as alloc::vec::SpecExtend<T,I>>::from_iter
   9: <core::iter::adapters::Map<I,F> as core::iter::traits::iterator::Iterator>::fold
  10: <alloc::vec::Vec<T> as alloc::vec::SpecExtend<T,I>>::from_iter
  11: core::builders::mutations::root::RootWriteQueryBuilder::build
  12: <&mut I as core::iter::traits::iterator::Iterator>::next
  13: <alloc::vec::Vec<T> as alloc::vec::SpecExtend<T,I>>::from_iter
  14: core::ops::function::impls::<impl core::ops::function::FnOnce<A> for &mut F>::call_once
  15: <&mut I as core::iter::traits::iterator::Iterator>::next
  16: <alloc::vec::Vec<T> as alloc::vec::SpecExtend<T,I>>::from_iter
  17: core::builders::root::RootBuilder::build
  18: <prisma::req_handlers::graphql::GraphQlRequestHandler as prisma::req_handlers::RequestHandler>::handle
  19: prisma::http_handler
  20: <F as actix_web::with::FnWith<T,R>>::call_with
  21: <actix_web::with::WithHandlerFut<T,S,R> as futures::future::Future>::poll
  22: actix_web::pipeline::PipelineState<S,H>::poll
  23: <actix_web::pipeline::Pipeline<S,H> as actix_web::server::handler::HttpHandlerTask>::poll_io
  24: actix_web::server::h1::Http1Dispatcher<T,H>::poll_handler
  25: actix_web::server::h1::Http1Dispatcher<T,H>::poll
  26: <actix_web::server::channel::HttpChannel<T,H> as futures::future::Future>::poll
  27: <actix_web::server::channel::HttpChannel<T,H> as futures::future::Future>::poll
  28: <actix_net::service::and_then::AndThenFuture<A,B> as futures::future::Future>::poll
  29: futures::future::chain::Chain<A,B,C>::poll
  30: futures::task_impl::std::set
  31: futures::task_impl::Spawn<T>::poll_future_notify
  32: tokio_current_thread::CurrentRunner::set_spawn
  33: tokio_current_thread::scheduler::Scheduler<U>::tick
  34: tokio_current_thread::Entered<P>::block_on
  35: std::thread::local::LocalKey<T>::with
  36: std::thread::local::LocalKey<T>::with
  37: std::thread::local::LocalKey<T>::with
  38: std::thread::local::LocalKey<T>::with
  39: tokio::runtime::current_thread::runtime::Runtime::block_on
```
