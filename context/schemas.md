# User Schema

```ts
{
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    index: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },

  emailVerifiedAt: {
    type: Date,
    default: null,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  firstName: {
    type: String,
    trim: true,
    maxlength: 50,
    default: "",
  },

  lastName: {
    type: String,
    trim: true,
    maxlength: 50,
    default: "",
  },

  displayName: {
    type: String,
    trim: true,
    maxlength: 80,
    default: "",
  },

  bio: {
    type: String,
    trim: true,
    maxlength: 500,
    default: "",
  },

  avatar: {
    url: {
      type: String,
      default: null,
    },

    publicId: {
      type: String,
      default: null,
    },
  },

  preferences: {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },

    taskView: {
      type: String,
      enum: ["list", "table", "board"],
      default: "list",
    },

    timezone: {
      type: String,
      default: "Asia/Tehran",
    },

    trashRetentionDays: {
      type: Number,
      default: 30,
    },
  },

  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },

  twoFactorSecretEncrypted: {
    type: String,
    default: null,
    select: false,
  },

  twoFactorRecoveryCodeHashes: [{
    type: String,
    select: false,
  }],

  sessionVersion: {
    type: Number,
    default: 0,
    select: false,
  },

  lastLoginAt: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
}
```

# Task Schema

```ts
{
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  groupId: {
    type: ObjectId,
    ref: "TaskGroup",
    default: null,
    index: true,
  },

  workspaceId: {
    type: ObjectId,
    ref: "Workspace",
    default: null,
    index: true,
  },

  assigneeIds: [{
    type: ObjectId,
    ref: "User",
  }],

  tagIds: [{
    type: ObjectId,
    ref: "Tag",
  }],

  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200,
  },

  description: {
    type: String,
    trim: true,
    maxlength: 5000,
    default: "",
  },

  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
    index: true,
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
    index: true,
  },

  dueDate: {
    type: Date,
    default: null,
    index: true,
  },

  completedAt: {
    type: Date,
    default: null,
  },

  checklist: [{
    text: { type: String, required: true, maxlength: 500 },
    isCompleted: { type: Boolean, default: false },
    position: { type: Number, required: true },
    completedAt: { type: Date, default: null },
  }],

  recurrence: {
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "weekdays", "custom", null],
      default: null,
    },
    interval: { type: Number, default: 1 },
    daysOfWeek: [{ type: Number, min: 0, max: 6 }],
    endAt: { type: Date, default: null },
    isPaused: { type: Boolean, default: false },
  },

  reminders: [{
    remindAt: { type: Date, required: true },
    snoozedUntil: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    dismissedAt: { type: Date, default: null },
  }],

  dependencyIds: [{
    type: ObjectId,
    ref: "Task",
  }],

  attachmentIds: [{
    type: ObjectId,
    ref: "Attachment",
  }],

  archivedAt: {
    type: Date,
    default: null,
    index: true,
  },

  trashedByGroupId: {
    type: ObjectId,
    ref: "TaskGroup",
    default: null,
    index: true,
  },

  deletedAt: {
    type: Date,
    default: null,
    index: true,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
}
```

# Task Group Schema

```ts
{
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  workspaceId: {
    type: ObjectId,
    ref: "Workspace",
    default: null,
    index: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },

  description: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: "",
  },

  color: {
    type: String,
    trim: true,
    default: null,
  },

  deletedAt: {
    type: Date,
    default: null,
    index: true,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
}
```

# Note Schema

```ts
{
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  workspaceId: {
    type: ObjectId,
    ref: "Workspace",
    default: null,
    index: true,
  },

  tagIds: [{
    type: ObjectId,
    ref: "Tag",
  }],

  attachmentIds: [{
    type: ObjectId,
    ref: "Attachment",
  }],

  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200,
  },

  content: {
    type: Mixed,
    required: true,
  },

  plainText: {
    type: String,
    default: "",
  },

  archivedAt: {
    type: Date,
    default: null,
    index: true,
  },

  deletedAt: {
    type: Date,
    default: null,
    index: true,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
}
```

# Notification Schema

```ts
{
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  workspaceId: {
    type: ObjectId,
    ref: "Workspace",
    default: null,
    index: true,
  },

  type: {
    type: String,
    required: true,
    enum: [
      "task.created",
      "task.updated",
      "task.trashed",
      "task.restored",
      "task.deleted",
      "task.status-changed",

      "group.created",
      "group.updated",
      "group.trashed",
      "group.restored",
      "group.deleted",

      "note.created",
      "note.updated",
      "note.trashed",
      "note.restored",
      "note.deleted",

      "profile.updated",
      "avatar.updated",
      "avatar.removed",
      "password.changed",
      "reminder.due",
      "task.assigned",
      "comment.created",
      "mention.created",
      "workspace.invited",
      "workspace.member-added",
      "workspace.role-changed",
      "security.session-revoked",
    ],
    index: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },

  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },

  resourceType: {
    type: String,
    enum: ["task", "group", "note", "profile", "account", "workspace", "comment", "attachment", null],
    default: null,
  },

  resourceId: {
    type: ObjectId,
    default: null,
  },

  isRead: {
    type: Boolean,
    default: false,
    index: true,
  },

  readAt: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
}
```

# Extended Feature Schemas

## Session Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  tokenHash: { type: String, required: true, unique: true, select: false },
  deviceName: { type: String, default: "" },
  ipAddress: { type: String, default: "" },
  userAgent: { type: String, default: "" },
  lastUsedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true, index: true },
  revokedAt: { type: Date, default: null, index: true },
}
```

## Authentication Token Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  type: {
    type: String,
    enum: ["email-verification", "password-reset", "workspace-invitation"],
    required: true,
    index: true,
  },
  tokenHash: { type: String, required: true, unique: true, select: false },
  expiresAt: { type: Date, required: true, index: true },
  usedAt: { type: Date, default: null },
}
```

## Security Event Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  type: { type: String, required: true, index: true },
  ipAddress: { type: String, default: "" },
  userAgent: { type: String, default: "" },
  metadata: { type: Mixed, default: {} },
  createdAt: { type: Date, required: true, index: true },
}
```

## Tag Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  workspaceId: { type: ObjectId, ref: "Workspace", default: null, index: true },
  name: { type: String, required: true, trim: true, maxlength: 50 },
  color: { type: String, default: null },
}
```

## Saved Filter Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  resourceType: { type: String, enum: ["task", "note"], required: true },
  query: { type: Mixed, required: true },
  position: { type: Number, default: 0 },
}
```

## Task Template Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  workspaceId: { type: ObjectId, ref: "Workspace", default: null, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  taskDefaults: { type: Mixed, required: true },
}
```

## Attachment Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  workspaceId: { type: ObjectId, ref: "Workspace", default: null, index: true },
  resourceType: { type: String, enum: ["task", "note"], required: true },
  resourceId: { type: ObjectId, required: true, index: true },
  uploadthingKey: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  name: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
}
```

## Push Subscription Schema

```ts
{
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  endpoint: { type: String, required: true, unique: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  expiresAt: { type: Date, default: null },
}
```

## Workspace Schema

```ts
{
  ownerId: { type: ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, default: "", maxlength: 1000 },
  avatar: {
    url: { type: String, default: null },
    publicId: { type: String, default: null },
  },
  deletedAt: { type: Date, default: null, index: true },
}
```

## Workspace Membership Schema

```ts
{
  workspaceId: { type: ObjectId, ref: "Workspace", required: true, index: true },
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  role: {
    type: String,
    enum: ["owner", "admin", "editor", "viewer"],
    required: true,
  },
}
```

## Workspace Invitation Schema

```ts
{
  workspaceId: { type: ObjectId, ref: "Workspace", required: true, index: true },
  inviterId: { type: ObjectId, ref: "User", required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  role: { type: String, enum: ["admin", "editor", "viewer"], required: true },
  tokenHash: { type: String, required: true, unique: true, select: false },
  expiresAt: { type: Date, required: true, index: true },
  acceptedAt: { type: Date, default: null },
}
```

## Comment Schema

```ts
{
  workspaceId: { type: ObjectId, ref: "Workspace", required: true, index: true },
  taskId: { type: ObjectId, ref: "Task", required: true, index: true },
  userId: { type: ObjectId, ref: "User", required: true, index: true },
  parentCommentId: { type: ObjectId, ref: "Comment", default: null },
  content: { type: String, required: true, maxlength: 5000 },
  mentionedUserIds: [{ type: ObjectId, ref: "User" }],
  editedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
}
```

## Activity Event Schema

```ts
{
  workspaceId: { type: ObjectId, ref: "Workspace", required: true, index: true },
  actorId: { type: ObjectId, ref: "User", required: true, index: true },
  type: { type: String, required: true, index: true },
  resourceType: { type: String, required: true },
  resourceId: { type: ObjectId, required: true },
  metadata: { type: Mixed, default: {} },
  createdAt: { type: Date, required: true, index: true },
}
```

# User Indexes

```ts
{
  username: 1;
}
```

# Task Indexes

```ts
{
  userId: 1,
  deletedAt: 1,
}
```

```ts
{
  userId: 1,
  status: 1,
  deletedAt: 1,
}
```

```ts
{
  userId: 1,
  groupId: 1,
  deletedAt: 1,
}
```

```ts
{
  userId: 1,
  priority: 1,
  deletedAt: 1,
}
```

```ts
{
  userId: 1,
  dueDate: 1,
  deletedAt: 1,
}
```

```ts
{
  userId: 1,
  createdAt: -1,
  deletedAt: 1,
}
```

# Task Group Indexes

```ts
{
  userId: 1,
  deletedAt: 1,
}
```

```ts
{
  userId: 1,
  createdAt: -1,
  deletedAt: 1,
}
```

# Note Indexes

```ts
{
  userId: 1,
  deletedAt: 1,
}
```

```ts
{
  userId: 1,
  createdAt: -1,
  deletedAt: 1,
}
```

# Notification Indexes

```ts
{
  userId: 1,
  isRead: 1,
  createdAt: -1,
}
```

```ts
{
  userId: 1,
  createdAt: -1,
}
```

# Extended Feature Indexes

Required compound indexes include:

```ts
{ workspaceId: 1, deletedAt: 1, createdAt: -1 }
{ workspaceId: 1, status: 1, deletedAt: 1 }
{ workspaceId: 1, assigneeIds: 1, deletedAt: 1 }
{ userId: 1, tagIds: 1, deletedAt: 1 }
{ userId: 1, archivedAt: 1, createdAt: -1 }
{ "reminders.remindAt": 1, "reminders.deliveredAt": 1 }
{ workspaceId: 1, userId: 1 } // unique membership
{ workspaceId: 1, createdAt: -1 } // activity and comments
{ userId: 1, expiresAt: 1, revokedAt: 1 } // sessions
{ userId: 1, name: 1, workspaceId: 1 } // unique tag within scope
```

Search indexes must cover Task titles and descriptions, Group names and descriptions, Note titles and plain text, Comment content, and authorized Workspace names.
