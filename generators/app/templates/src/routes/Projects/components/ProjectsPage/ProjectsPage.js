import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import classes from './ProjectsPage.scss'

export const ProjectsPage = ({
  children,
  projects,
  collabProjects,
  auth,
  newDialogOpen,
  toggleDialog,
  deleteProject,
  addProject,
  goToProject,
  goToCollaborator
}) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div className={classes.container}>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <div className={classes.tiles}>
        <NewProjectTile onClick={toggleDialog} />
        {!isEmpty(projects) &&
          projects.map((project, ind) => (
            <ProjectTile
              key={`Project-${<% if (includeRedux && includeFirestore) { %>project.id<% } %><% if (includeRedux && !includeFirestore) { %>project.key<% } %>}-${ind}`}
              name={<% if (includeRedux && includeFirestore) { %>project.name<% } %><% if (includeRedux && !includeFirestore) { %>project.value.name<% } %>}
              onCollabClick={goToCollaborator}
              onSelect={() => goToProject(<% if (includeRedux && !includeFirestore) { %>project.key<% } %><% if (includeRedux && includeFirestore) { %>project.id<% } %>)}
              onDelete={() => deleteProject(<% if (includeRedux && !includeFirestore) { %>project.key<% } %><% if (includeRedux && includeFirestore) { %>project.id<% } %>)}
            />
          ))}
      </div>
    </div>
  )

ProjectsPage.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  projects: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func, // from enhancer (withStateHandlers)
  deleteProject: PropTypes.func, // from enhancer (withHandlers - firebase)
  addProject: PropTypes.func, // from enhancer (withHandlers - firebase)
  goToProject: PropTypes.func // from enhancer (withHandlers - router)
}

export default ProjectsPage
