import { APHContext } from "../context";
import { AngularWorkspace, AngularJSON, PackageJSON, AngularJSONProject, AngularProject, ProjectDependency } from "../types";
import { loadJson, resolveAndCheckFilename } from "./file-helper";

export async function loadWorkspace(path: string): Promise<AngularWorkspace> {

  const angularJsonFilename = await resolveAndCheckFilename(path, "angular.json")
  const packageJsonFilename = await resolveAndCheckFilename(path, "package.json")

  const angularJson = await loadJson<AngularJSON>(angularJsonFilename)
  const packageJson = await loadJson<PackageJSON>(packageJsonFilename)

  const projects: {
    [name: string]: AngularProject
  } = {}

  for(const name in angularJson.projects) {
    const definition = angularJson.projects[name]

    projects[name] = await prepareProject(name, definition, path)
  }

  const result: AngularWorkspace = {
    angularJson,
    packageJson,
    projects,
    workspaceRoot: path
  }

  return result
}

export async function prepareProject(name: string, definition: AngularJSONProject, workspaceRoot: string): Promise<AngularProject> {
  
  const dependencies = await analyzeDependencies(definition, workspaceRoot)
  const projectPackageJsonFilename= await getProjectPackageJsonFilename(definition, workspaceRoot)

  const result: AngularProject = {
    definition,
    dependencies,
    name,
    projectPackageJsonFilename
  }

  return result
}

export async function analyzeDependencies(definition: AngularJSONProject, workspaceRoot: string): Promise<ProjectDependency[]> {
  throw new Error("loading dependecies is not implemented")
}

export async function getProjectPackageJsonFilename(definition: AngularJSONProject, workspaceRoot: string): Promise<string> {
  throw new Error("searching for project package json filename is not implemented")
}

export function addOrUpdateWorkspace(ctx: APHContext, workspace: AngularWorkspace): APHContext {
  
  // remove all projects assosiated with workspace
  const stripedKeys = Object.keys(ctx.projectLookup).filter(key => ctx.projectLookup[key].workspace.workspaceRoot !== workspace.workspaceRoot)

  const nextLookup: {
    [name: string]: {
      project: AngularProject
      workspace: AngularWorkspace
    }
  } = {}

  for(const key of stripedKeys) {
    nextLookup[key] = ctx.projectLookup[key]
  }

  for(const name in workspace.projects) {
    if(nextLookup[name]) {
      throw new Error(`Name conflict: project ${name} exists in workspace '${nextLookup[name].workspace.workspaceRoot}' and workspace '${workspace.workspaceRoot}'`)
    }
    nextLookup[name]= {
      project: workspace.projects[name],
      workspace
    }
  }
  
  const next: APHContext = {
    ...ctx,
    projectLookup: nextLookup
  }
  next.workspaces[workspace.workspaceRoot] = workspace

  return next
}
