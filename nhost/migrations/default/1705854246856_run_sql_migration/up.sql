CREATE INDEX "meeting_currentStepId_key" ON meeting ("currentStepId") WHERE "currentStepId" IS NOT NULL;
