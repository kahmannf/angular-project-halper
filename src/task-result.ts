export interface APHTaskResult<TResult> {
  success: boolean
  errorMessage?: string
  resultData?: TResult
}