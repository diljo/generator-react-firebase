import React, { Component, PropTypes } from 'react'
import { toArray } from 'lodash'

import classes from './ProjectContainer.scss'
import CircularProgress from 'material-ui/CircularProgress'


export default class Project extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  

  selectProject = proj => {
    if (proj.owner) {
      this.context.router.push(`/projects/${proj.owner}/${proj.name}`)
    }
  }

  render () {
    const { project } = this.props

    if (!isLoaded(project)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes['container']}>
        <h2>Project Container</h2>
        <pre>{JSON.stringify(project)}</pre>
      </div>
    )
  }
}
