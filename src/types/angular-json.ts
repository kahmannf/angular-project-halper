import { AngularJSONProject } from "./angular-json-project"

/**
 * Describes the schema of the angular.json file
 */
export interface AngularJSON {
  $schema: string
  version: number
  newProjectRoot: string
  projects: { [name: string]: AngularJSONProject }
  defaultProject: string
}
