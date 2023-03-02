CREATE  INDEX "task_status_index" on
  "public"."task" using hash ("status");
