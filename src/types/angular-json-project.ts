/**
 * Describes a angular project as it can be found in the angular.json's projects-property
 */
export interface AngularJSONProject {
  root: string,
  sourceRoot: string
  projectType: 'application' | 'library'
  prefix: string
  schematics?: { [name: string]: any }
  architect: {
    [name: string]: {
      builder: string
      options?: { [key: string]: any }
      configurations?: { [key: string]: any } 
    }
  }
}
