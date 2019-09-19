import { APHTaskHandle } from "./task-handle"
import { APHContext } from "./context"

export interface APHTask<TOptions, TResult> {
  execute(options: TOptions, ctx: APHContext): APHTaskHandle<TResult>
}
