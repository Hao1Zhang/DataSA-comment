import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createComment } from "../src/graphql/mutations";
import { listComments } from "../src/graphql/queries";
import axios from "axios";
import CommentExampleComment from "./comment";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
// var fs = require("fs");

let allClose = false;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function createData(
  ID,
  Lots,
  Address,
  Suburb_PostCode,
  Suburb,
  Street,
  PostCode
) {
  return {
    Lots,
    Address,
    Suburb_PostCode,
    Suburb,
    Street,
    PostCode,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
    allClose = !allClose;
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
    allClose = !allClose;
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
    allClose = !allClose;
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    allClose = !allClose;
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const getCommentsById = (id) => {};
  useEffect(() => {
    setOpen(false);
    console.log("allClose")
  },[allClose])

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.Lots}
        </TableCell>
        <TableCell align="right">{row.Address}</TableCell>
        <TableCell align="right">{row.Suburb_PostCode}</TableCell>
        <TableCell align="right">{row.Suburb}</TableCell>
        <TableCell align="right">{row.Street}</TableCell> */}
        {Object.keys(row).map(function (key, index) {
          // row[key] *= 2;
          return (
            <TableCell key={row._id + key} align="right">
              {row[key]}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Comments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total PostCode ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.PostCode * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box> */}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                {/* <Item>xs=8</Item> */}
              </Grid>
              <Grid item xs={8}>
              <CommentExampleComment itemId = {row._id}/>
              </Grid>
              <Grid item xs={2}>
                {/* <Item>xs=4</Item> */}
              </Grid>
            </Grid>
            
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Address: PropTypes.number.isRequired,
    Suburb: PropTypes.number.isRequired,
    Suburb_PostCode: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    Lots: PropTypes.string.isRequired,
    PostCode: PropTypes.number.isRequired,
    Street: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getData = () => {
    const url =
      "https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=19beeceb-a870-4424-b533-43c774bcb03e";
    axios.get(url).then((res) => {
      console.log(res.data.result);
      setFields(res.data.result.fields);
      setRecords(res.data.result.records);
    });
  };
  const [fields, setFields] = useState([]);
  const [records, setRecords] = useState([]);

  // var TcheckResult = {initDatas.map((row) => (
  //   <Row key={row.Lots} row={row} />
  // ))}
  {
    useEffect(() => {
      getData();
    }, []);
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell />
            {fields.map((field) => {
              return <TableCell key={field.id}>{field.id}</TableCell>;
            })}
            {/* <TableCell>Lots</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Suburb_PostCode</TableCell>
            <TableCell align="right">Suburb</TableCell>
            <TableCell align="right">Street</TableCell>
            <TableCell align="right">PostCode</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : records
          ).map((row) => (
            <Row key={row.Lots} row={row} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow >
            <TablePagination
             style={{minWidth:'500px'}}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={records.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
