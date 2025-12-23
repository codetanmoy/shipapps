import "server-only"

import { MongoClient } from "mongodb"

export type LeadInput = {
  kind: "testflight" | "mvp_sprint"
  firstName: string
  email: string
  appType?: string | null
  notes?: string | null
  budgetUsd?: number | null
  source?: string | null
  userAgent?: string | null
  ip?: string | null
}

function buildMongoUriFromEnv() {
  const direct = process.env.MONGODB_URI
  if (typeof direct === "string" && direct.trim().length > 0) return direct.trim()

  const host = process.env.HOST
  if (typeof host !== "string" || host.trim().length === 0) return null
  const trimmedHost = host.trim()

  if (trimmedHost.startsWith("mongodb://") || trimmedHost.startsWith("mongodb+srv://")) {
    return trimmedHost
  }

  const username = process.env.USERNAME
  const password = process.env.PASSWORD
  if (typeof username !== "string" || typeof password !== "string") return null

  const user = encodeURIComponent(username.trim())
  const pass = encodeURIComponent(password.trim())

  return `mongodb+srv://${user}:${pass}@${trimmedHost}/?retryWrites=true&w=majority`
}

function getDatabaseName() {
  const name = process.env.DATABASE_NAME
  if (typeof name === "string" && name.trim().length > 0) return name.trim()
  return "shipapps"
}

function getMongoClient() {
  const uri = buildMongoUriFromEnv()
  if (!uri) return null

  const globalForMongo = globalThis as unknown as { __shipappsMongoClient?: MongoClient }
  if (!globalForMongo.__shipappsMongoClient) {
    globalForMongo.__shipappsMongoClient = new MongoClient(uri)
  }

  return globalForMongo.__shipappsMongoClient
}

export async function insertLead(input: LeadInput) {
  const client = getMongoClient()
  if (!client) {
    throw new Error("Database not configured. Set MONGODB_URI or HOST/USERNAME/PASSWORD.")
  }

  const db = client.db(getDatabaseName())
  await db.collection("leads").insertOne({
    kind: input.kind,
    firstName: input.firstName,
    email: input.email,
    appType: input.appType ?? null,
    notes: input.notes ?? null,
    budgetUsd: input.budgetUsd ?? null,
    source: input.source ?? null,
    userAgent: input.userAgent ?? null,
    ip: input.ip ?? null,
    createdAt: new Date(),
  })
}
