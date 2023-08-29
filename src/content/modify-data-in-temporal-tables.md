---
layout: post
title: How to modify data in a temporal/versioned table
image: img/unsplash/jan-antonin-kolar-lRoX0shwjUQ-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-08-29T00:00:00.000Z
tags: [Temporal, SystemVersioned, SQL]
draft: false
excerpt: modify data in temporal tables
---

Photo by <a href="https://unsplash.com/@jankolar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jan Antonin Kolar</a> on <a href="https://unsplash.com/photos/lRoX0shwjUQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# How to modify data in a temporal/versioned table

Temporal tables, also known as system-versioned temporal tables, allow you to keep a full history of data changes in a separate table called a history table. This history table is linked to the main table and is automatically populated by the database system whenever a row in the main table is updated or deleted.

Given this behavior, direct modifications (like DELETE or UPDATE operations) to the history table are generally not allowed, to ensure data integrity and the accuracy of the history.

> ⚠️ If you're trying to delete rows from the main table, and an error is being raised, make sure you're not directly targeting the history table by mistake. If you delete rows from the main table, the corresponding rows in the history table will be preserved (that's the whole point of temporal tables). If you're trying to clean up or archive old history data, consider looking into best practices for managing data in temporal tables.


If you really need to modify the history table:

```sql
-- Set system-versioning to OFF
ALTER TABLE YourMainTableName SET (SYSTEM_VERSIONING = OFF);

-- Make your changes to the history table

-- Set system-versioning back to ON
ALTER TABLE YourMainTableName SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = YourHistoryTableName));
```
