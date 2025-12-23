# MongoDB collection: `leads`

ShipApps stores inbound requests in a MongoDB collection named `leads`.

## Recommended indexes

Create these indexes once (MongoDB Atlas UI or `mongosh`):

```js
db.leads.createIndex({ kind: 1, createdAt: -1 })
db.leads.createIndex({ email: 1 })
```

