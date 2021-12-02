import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearScale from '@material-ui/icons/LinearScale';
import AddCircle from '@material-ui/icons/AddCircle';
import Delete from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Pagination from '@mui/material/Pagination';
// import TablePagination from '@mui/material/TablePagination';

const useStyles = makeStyles(theme => ({
  listItem: {
    direction: 'column',
    width: 'fit-content',
    borderBottom: '1px solid #E3E0D8',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
    // [theme.breakpoints.down('sm')]: {
    //   width: 300,
    // },
  },
  listItemTerm: {
    witdh: '-webkit-fill-available',
    fontSize: '1.2rem',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  ontologyTitle: {
    witdh: '-webkit-fill-available',
    fontSize: '0.9rem',
    margin: '0rem 1rem 0rem 1rem',
    color: '#8c1717'
  },
  listItemIcon: {
    padding: theme.spacing(0.5)
  },
  // itemTextGrp: {
  //   marginTop: theme.spacing(0.5),
  //   marginBottom: theme.spacing(0.5)
  // }
  list: {
    maxHeight: '20rem',
    height: 'fit-content',
    overflow: 'auto'
  }
}));

const defaultPageSize = 100;

export default function AnswersList({
  handleDelete,
  handleAddCalculation,
  handleAddTerm,
  answers
}) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const noOfPages = Math.ceil(answers.length / defaultPageSize);
    setCount(noOfPages);
    const displayList =
      answers.length < defaultPageSize
        ? [...answers]
        : answers.slice((page - 1) * defaultPageSize, page * defaultPageSize);
    setDisplay(displayList);
  }, [answers, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <List className={classes.list}>
        {display.map((el, i) => {
          const title =
            typeof el.title === 'string'
              ? el.title
              : `(${el.title.acronym} - ${el.title.name})`;
          return (
            <ListItem
              className={classes.listItem}
              key={`${el.allowedTerm.codeMeaning}-${i}`}
            >
              <div className={classes.itemTextGrp}>
                <span className={classes.listItemTerm}>
                  {el.allowedTerm.codeMeaning}
                </span>
                <span className={classes.ontologyTitle}>{title}</span>
              </div>
              <Tooltip title="Add Quantification">
                <IconButton
                  onClick={() => handleAddCalculation(el.id)}
                  className={classes.listItemIcon}
                >
                  <LinearScale />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Term">
                <IconButton
                  onClick={() => handleAddTerm(el.id)}
                  className={classes.listItemIcon}
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleDelete(el)}
                  className={classes.listItemIcon}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
      <Pagination
        count={count}
        page={page}
        onChange={handleChangePage}
        showLastButton
      />
    </>
  );
}

AnswersList.propTypes = {
  handleDelete: PropTypes.func,
  handleAddCalculation: PropTypes.func,
  handleAddTerm: PropTypes.func,
  chracteristic: PropTypes.bool,
  answers: PropTypes.array
};
