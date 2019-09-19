import { APHTask } from "../task";
import { ProjectDependency } from "../types";
import { APHTaskResult } from "../task-result";
import { APHContext } from "../context";

export const getProjectDependencies: APHTask<GetProjectDependenciesOptions, ProjectDependency[]> = {
  execute: (option, ctx) => ({
    output: null,
    result: Promise.resolve(getResult(option, ctx))
  })
}

function getResult(options: GetProjectDependenciesOptions, ctx: APHContext): APHTaskResult<ProjectDependency[]> {
  let result: APHTaskResult<ProjectDependency[]> | undefined = undefined
  
  if(!ctx.projectLookup[options.projectName]) {
    result = {
      errorMessage: `No project with name '${options.projectName}`,
      success: false
    }
    return result
  }
  
  result = {
    success: true,
    resultData: ctx.projectLookup[options.projectName].project.dependencies
  }

  return result
}

export interface GetProjectDependenciesOptions {
  projectName: string
}