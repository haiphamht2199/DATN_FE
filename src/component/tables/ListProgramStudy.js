import React, { useState, useEffect, useCallback } from 'react'
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
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  { id: 1, nameProgram: 'Chương trình số 1 ', createUser: 'Phạm Đình Hải', startDate: "10:00,29/10/2022", editDate: "10:00,30/10/2022", status: "Hoạt động", },
  { id: 2, nameProgram: 'Chương trình số 2 ', createUser: 'Vương Xuân Hiệu', startDate: "10:00,29/10/2022", editDate: "10:00,30/10/2022", status: "Hoạt động", },
  { id: 3, nameProgram: 'Chương trình số 3 ', createUser: 'Phạm Đình Hải', startDate: "10:00,29/10/2022", editDate: "10:00,30/10/2022", status: "Hoạt động", },
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
  const stabilizedThis = array.map((el, index) => [el, index]);
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
    id: 'nameProgram',
    numeric: false,
    disablePadding: true,
    label: 'Tên chương trình',
  },
  {
    id: 'createUser',
    numeric: true,
    disablePadding: false,
    label: 'Người tạo',
  },
  {
    id: 'startDate',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian tạo',
  },
  {
    id: 'editDate',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian chỉnh sửa',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Thao tác',
  },
];
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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


function ListProgramStudy(props) {
  const dispatch = useDispatch();
  const allCategoryProgram = useSelector(state => state._class.classDetail.allCategoryProgram);
  console.log("allCategoryProgram:", allCategoryProgram)
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openAction, setOpenAction] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [programId, setProgramId] = useState("")
  const navigate = useNavigate();
  const handleClickSetting = useCallback((event, row) => {
    console.log("program_category_id:", row.program_category_id)
    setAnchorEl(event.currentTarget);
    setOpenAction(!openAction);
    setProgramId(row.program_category_id)
  }, [setProgramId])
  const handleClose = (anchorEl, programId) => {
    console.log("programId:", programId)
    setAnchorEl(null);
    setOpenAction(false)
  };

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleDetailProgram = (row) => {
    navigate(`/bai-hoc/chi-tiet-lop-hoc/chi-tiet-chuong-trinh-hoc?class_id=${searchParams.get("class_id")}&program_category_id=${row.program_category_id}`);
  }
  useEffect(() => {
    if (searchParams.get("class_id")) {
      dispatch({
        type: 'GET_ALL_PROGRAM_CATEGERY_CLASS_BY_ID',
        payload: searchParams.get("class_id")
      })
    }
  }, [])
  return (
    <Box sx={{ width: '100%' }}>
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
              rowCount={allCategoryProgram.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(allCategoryProgram, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover


                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}

                    >
                      {/* <Link className='linkcustom' to={`chi-tiet-chuong-trinh-hoc?class_id=${searchParams.get("class_id")}&program_category_id=${row.program_category_id}`}> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDetailProgram(row)}
                      >
                        {row.name_program_category}
                      </TableCell>
                      {/* </Link> */}
                      <TableCell align="right">{row.create_by ? row.create_by : "Phạm Đình Hải"}</TableCell>
                      <TableCell align="right">{row.create_time}</TableCell>
                      <TableCell align="right">{row.modified_time}</TableCell>
                      <TableCell align="right">{row.status === 1 ? "Hoạt động" : "Không hoạt động"}</TableCell>
                      <TableCell align="right" onClick={(e) => handleClickSetting(e, row)} style={{ cursor: "pointer", paddingRight: "30px" }}><SettingsIcon className="iconSetting" /></TableCell>
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
                          <Link to=''>
                            <MenuItem onClick={handleClose}
                              disableRipple
                            >
                              <EditIcon />
                              Chỉnh sửa
                            </MenuItem>
                          </Link>

                          <MenuItem
                            programId={programId}
                            onClick={() => handleClose(anchorEl, programId)}
                            disableRipple>
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default ListProgramStudy