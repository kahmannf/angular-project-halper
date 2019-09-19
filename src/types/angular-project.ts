import { AngularJSONProject } from "./angular-json-project"
import { ProjectDependency } from "./project-dependency"
/**
 * Describes a angular project pepared for the use within the aph-tasks
 */
export interface AngularProject {
  name: string
  definition: AngularJSONProject
  dependencies: ProjectDependency[]
  projectPackageJsonFilename?: string
}
