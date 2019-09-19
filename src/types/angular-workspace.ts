import { PackageJSON } from "./package-json";
import { AngularJSON } from "./angular-json";
import { AngularProject } from "./angular-project";

export interface AngularWorkspace {
  angularJson: AngularJSON
  packageJson: PackageJSON
  projects: {
    [name: string]: AngularProject
  }
  workspaceRoot: string
}