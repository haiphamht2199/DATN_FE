import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
const rows = [
  { id: 1, nameStudent: 'Phạm Đình Hải', IdStudent: '20181061', gmail: "haipham2199ht@gmail.com", startClass: "29/10/2022-10:10", editDateClass: "10:00,29/10/2022", statusClass: "1" },
  { id: 2, nameStudent: 'Vương Xuân Hiệu', IdStudent: '20181063', gmail: "hieu.vx181063@gmail.com", startClass: "29/10/2022-10:10", editDateClass: "10:00,29/10/2022", statusClass: "1" },
  { id: 3, nameStudent: 'Phạm Đình Hải', IdStudent: '20181061', gmail: "haipham2199ht@gmail.com", startClass: "29/10/2022-10:10", editDateClass: "10:00,29/10/2022", statusClass: "1" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array && array.length && array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'nameStudent',
    numeric: false,
    disablePadding: true,
    label: 'Họ tên',
  },
  {
    id: 'IdStudent',
    numeric: true,
    disablePadding: false,
    label: 'Mã số sinh viên',
  },
  {
    id: 'gmail',
    numeric: true,
    disablePadding: false,
    label: 'Gmail',
  },
  {
    id: 'startClass',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian vào lớp',
  },
  {
    id: 'editDateClass',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian chỉnh sửa',
  },
  {
    id: 'statusClass',
    numeric: true,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'actionClass',
    numeric: true,
    disablePadding: false,
    label: 'Thao tác',
  },
];
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
      color="primary"
      indeterminate={numSelected > 0 && numSelected < rowCount}
      checked={rowCount > 0 && numSelected === rowCount}
      onChange={onSelectAllClick}
      inputProps={{
       'aria-label': 'select all desserts',
      }}
     /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : ""}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
function ListStudents(props) {
  const dispatch = useDispatch();
  let openEditStudent = useSelector(state => state.modal.editStudent)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAction, setOpenAction] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  let listStudent = useSelector(state => state._class.listStudent);
  const [email, setEmail] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const _class = useSelector((state) => state._class);
  console.log("_class:", _class)
  const handleClickSetting = useCallback((event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenAction(!openAction);
    setEmail(id)
  }, [email]);
  const handleClose = (anchorEl, modalOpenEditStudent) => {

    setAnchorEl(null);
    setOpenAction(false)
  };
  const handleOpenModal = useCallback((id) => {
    dispatch({
      type: "GET_STUDENT_CLASS",
      email: id
    })
    dispatch({
      type: "CHANGE_MODAL_EDIT_STUDENT",
      payload: openEditStudent,

    });
    setAnchorEl(null);
    setOpenAction(false)
  }, [openEditStudent])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // useEffect(() => {
  //   dispatch({
  //     type: "GET_ALL_LIST_STUDENT_CLASS",
  //     payload: rows
  //   })
  // }, [rows, listStudent]);
  useEffect(() => {
    if (searchParams.get("class_id")) {
      dispatch({
        type: 'GET_ALL_LIST_STUDENT_CLASS_BY_ID',
        payload: searchParams.get("class_id")
      })
    }
  }, []);
  useEffect(() => {
    if (_class.success1) {
      dispatch({
        type: 'GET_ALL_LIST_STUDENT_CLASS_BY_ID',
        payload: searchParams.get("class_id")
      })
      setTimeout(() => {
        dispatch({
          type: 'DELETE_SUCCESS_ADD_CLASS'
        })
      }, 100)

    }
  }, [_class.success1]);
  useEffect(() => {
    if (_class.success) {
      dispatch({
        type: 'GET_ALL_LIST_STUDENT_CLASS_BY_ID',
        payload: searchParams.get("class_id")
      })

    }
  }, [_class.success]);
  return (
    listStudent.length > 0 && <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listStudent.length ? listStudent.length : []}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(listStudent.length && listStudent, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover

                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name_student}
                      </TableCell>
                      <TableCell align="right">{row.code_student}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right" className='modified_date'>{row.create_date}</TableCell>
                      <TableCell align="right" >{row.modified_date}</TableCell>
                      <TableCell align="right">{row.status === 1 ? "Đang học" : "Không học"}</TableCell>
                      <TableCell align="right" style={{ paddingRight: "30px" }}><SettingsIcon style={{ cursor: "pointer" }} onClick={(e) => handleClickSetting(e, row.email)} className="iconSetting" /></TableCell>
                      <div>
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                          }}
                          anchorEl={anchorEl}
                          open={openAction}
                          onClose={handleClose}
                        >

                          <MenuItem onClick={() => handleOpenModal(email)} disableRipple>
                            <EditIcon />
                            Chỉnh sửa
                          </MenuItem>


                          <MenuItem onClick={() => handleClose(anchorEl)} disableRipple>
                            <DeleteIcon />
                            Xóa
                          </MenuItem>

                        </StyledMenu>
                      </div>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ListStudents