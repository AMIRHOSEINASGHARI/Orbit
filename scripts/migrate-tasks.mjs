import { createRequire } from "node:module";
import mongoose from "mongoose";

const { loadEnvConfig } = createRequire(import.meta.url)("@next/env");
loadEnvConfig(process.cwd());

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured.");

const recurrence = {
  frequency: null,
  interval: 1,
  daysOfWeek: [],
  endAt: null,
  isPaused: false,
};

const fields = [
  ["groupId", null],
  ["workspaceId", null],
  ["assigneeIds", [], true],
  ["tagIds", [], true],
  ["description", ""],
  ["status", "todo"],
  ["priority", "medium"],
  ["dueDate", null],
  ["completedAt", null],
  ["checklist", [], true],
  ["recurrence", recurrence, true],
  ["recurrence.frequency", null, false, true],
  ["recurrence.interval", 1, false, true],
  ["recurrence.daysOfWeek", [], true, true],
  ["recurrence.endAt", null, false, true],
  ["recurrence.isPaused", false, false, true],
  ["reminders", [], true],
  ["dependencyIds", [], true],
  ["attachmentIds", [], true],
  ["archivedAt", null],
  ["trashedByGroupId", null],
  ["deletedAt", null],
];

function missingFilter(path, includeNull, nested) {
  const filter = { [path]: includeNull ? null : { $exists: false } };
  return nested ? { ...filter, recurrence: { $type: "object" } } : filter;
}

async function report(collection) {
  const total = await collection.countDocuments();
  const rows = await Promise.all(fields.map(async ([path, , includeNull, nested]) => ({
    field: path,
    remaining: await collection.countDocuments(missingFilter(path, includeNull, nested)),
  })));
  const invalidRequired = await collection.countDocuments({
    $or: [{ userId: { $exists: false } }, { userId: null }, { title: { $exists: false } }, { title: null }, { title: "" }],
  });
  const missingTimestamps = await collection.countDocuments({
    $or: [{ createdAt: { $exists: false } }, { updatedAt: { $exists: false } }],
  });
  const unknownCompletion = await collection.countDocuments({ status: "done", completedAt: null });

  console.log(`Database: ${collection.dbName}; tasks: ${total}`);
  console.table(rows.filter(({ remaining }) => remaining > 0));
  console.log(`Missing required identity/title: ${invalidRequired}; missing timestamps: ${missingTimestamps}; done tasks without known completion time: ${unknownCompletion}`);
  return { total, rows, invalidRequired, missingTimestamps };
}

try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10_000 });
  const collection = mongoose.connection.db?.collection("tasks");
  if (!collection) throw new Error("Task collection is unavailable.");

  const before = await report(collection);
  if (process.argv.includes("--apply")) {
    if (before.invalidRequired || before.missingTimestamps) throw new Error("Some tasks lack required identity, title, or timestamps; resolve those records before migration.");
    for (const [path, value, includeNull, nested] of fields) {
      const result = await collection.updateMany(missingFilter(path, includeNull, nested), { $set: { [path]: value } });
      if (result.modifiedCount) console.log(`${path}: updated ${result.modifiedCount}`);
    }
    const after = await report(collection);
    if (after.total !== before.total || after.rows.some(({ remaining }) => remaining > 0)) {
      throw new Error("Task migration verification failed.");
    }
    console.log("Task migration complete.");
  } else {
    console.log("Dry run only. Pass --apply to update missing fields.");
  }
} catch (error) {
  const message = error instanceof Error ? error.message.replaceAll(process.env.MONGODB_URI, "<redacted>") : String(error);
  console.error(`Task migration failed: ${message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
