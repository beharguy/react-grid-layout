import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import ViewGridItem from './ViewGridItem';

const style = (theme) => ({
  viewsGrid: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    alignContent: 'flex-start',
    padding: 10,
    background: theme.palette.background.default
  },
  viewsGridItem: {
    background: theme.palette.background.paper,
    border: `solid 1px ${theme.palette.divider}`
  },
  viewListItemTitleBar: {
    background:
      'linear-gradient(to top, rgba(255,255,255,255) 0%, rgba(255,255,255,255) 70%, rgba(255,255,255,0.5) 100%)',
  },
  viewListItemTitle: {
    color: theme.palette.primary.dark,
  }
});

const View = ({ classes }) => {
  const views = useSelector(state => state.views);

  return (
    <GridList cellHeight={200} spacing={20} className={classes.viewsGrid} cols={3}>
      {views.map((view, viewIndex) => {
        return <GridListTile key={viewIndex} classes={{tile: classes.viewsGridItem}}>
          <ViewGridItem view={view} />

          <GridListTileBar
            title={`View ${view.id}`}
            classes={{
              root: classes.viewListItemTitleBar,
              title: classes.viewListItemTitle,
            }}
            actionIcon={
              <Link to={`/configure-view/${view.id}`}>
                <IconButton>
                  <EditIcon className={classes.viewListItemTitle} />
                </IconButton>
              </Link>
            }
          />
        </GridListTile>
      })}
    </GridList>
  );
};

View.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(View);