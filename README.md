# ReactRedux Boilerplate



## Summary


This sample code refers to the components:
- react-redux (store, action, reduce)
- react-thunk (middleware for async processes)

## Notes

### Store

- store.js is the entity where you store application states
- middleware and thunk is initialized here

### Action

- actions.js is that returns the payload
### Reduce

- reducers.js is the updates the state based on what the signaled action from actions.js

### React-Thunk

- handles the error "Error: Actions must be plain objects"
- lets you call action creators that return a function instead of an action object.
