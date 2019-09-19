import { APHTaskResult } from "./task-result"
import { Stream } from "stream"

export interface APHTaskHandle<TResult> {
  result: Promise<APHTaskResult<TResult>>
  output: Stream | null
}
