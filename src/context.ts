import { AngularWorkspace, AngularProject } from "./types";

export interface APHContext {
  workspaceRoots: string[]
  workspaces: {
    [root: string]: AngularWorkspace
  }
  projectLookup: {
    [name: string]: {
      project: AngularProject
      workspace: AngularWorkspace
    }
  }
}
