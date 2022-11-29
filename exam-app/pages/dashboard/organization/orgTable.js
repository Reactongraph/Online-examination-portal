import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import LayoutDashboard from ".././layoutDashboard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";
import { useApi } from "../../../hooks";
import { useRouter } from "next/router";
import { useState } from "react";


export default function OrganizationTable(props) {

  const org_data = props.organizations;
  
  // const { get } = useApi();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [quota, setQuota] = useState("");
  const [buttonText, setButtonText] = useState("Add");
  const [editForm, setEditForm] = useState(false);
  const [organizationId, setOrganizationId] = useState("");

  const { register, handleSubmit } = useForm();

  const handleRemoveClick = (org_id) => {
    axios
      .delete(`${SERVER_LINK}/rest-api/${org_id}`)
      .then((result) => {
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = (org_id) => {
    setOpen(true);
    setButtonText("Update");
    setEditForm(true);
    setOrganizationId(org_id);

    // first find the user with the id
    axios
      .get(`${SERVER_LINK}/rest-api/${org_id}`)
      .then((response) => {
        let singleOrgData = response.data;

        setName(singleOrgData.name);
        setEmail(singleOrgData.email);
        setMobile(singleOrgData.mobile);
        setState(singleOrgData.state);
        setAddress(singleOrgData.address);
        setCity(singleOrgData.city);
        setpincode(singleOrgData.pincode);
        setQuota(singleOrgData.quota);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(name, email, org_id) {
    const action = (
      <>
        <Button
          onClick={() => handleEditClick(org_id)}
          style={{ marginRight: "5px" }}
          color="success"
          variant="contained"
        >
          Edit
        </Button>

        <Button
          onClick={() => handleRemoveClick(org_id)}
          style={{ marginRight: "5px" }}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </>
    );
    const status = (
      <>
        <Switch color="primary" defaultChecked size="md" />
      </>
    );
    return { name, email, status, action };
  }

  const rowsDataArray = org_data.map((element) => {
    let name = element.name;
    let email = element.email;
    let org_id = element.id;
    return createData(name, email, org_id);
  });

  const rows = rowsDataArray;

  const [open, setOpen] = React.useState(false);
  // const [checked, setChecked] = React.useState(false);

  const handleClickOpen = () => {
    setEditForm(false);
    setName("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setpincode("");
    setQuota("");
    setMobile("");
    setOpen(true);
    setButtonText("Add");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for sending the data to the backend
  const checkWithDatabase = async (data) => {
    data.status = true;
    data = JSON.stringify(data);

    // for taking the patch api data
    if (editForm) {
      await axios
        .patch(`${SERVER_LINK}/rest-api/${organizationId}`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((response) => {
          handleClose();
          router.replace(router.asPath);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // for new data registration
    else {
      await axios({
        url: `${SERVER_LINK}/rest-api`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data,
      })
        .then((response) => {
          handleClose();
          router.replace(router.asPath);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
       <Grid container item>
        <Paper style={{ margin: "20px 10px" }} elevation={0}>
          <Typography variant="h6" color="black">
            {" "}
            Organization Profile &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={handleClickOpen}>
              Add Organization
            </Button>
          </Typography>
        </Paper>
      </Grid>

      {/* for table  */}
      <Grid style={{ padding: "10px 30px", height: "100%" }} container item>
        <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={2}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.email}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>

      {/* the popup form */}
      <Dialog open={open}>
        {/* onClose={handleClose}  property can be used for closing the popup on outside click */}
        <DialogTitle>Add Organization</DialogTitle>
        <form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
          <DialogContent>
            {/* <DialogContentText>
              </DialogContentText> */}
            <TextField
              autoFocus
              required
              value={name}
              margin="dense"
              id="name"
              {...register("name", {
                onChange: (e) => setName(e.target.value),
              })}
              label="Organization Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              value={email}
              id="email"
              {...register("email", {
                onChange: (e) => setEmail(e.target.value),
              })}
              label="Email Address"
              // type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              value={city}
              {...register("city", {
                onChange: (e) => setCity(e.target.value),
              })}
              id="city"
              label="City"
              type="text"
              variant="standard"
            />
            {"   "} &nbsp; &nbsp;
            <TextField
              required
              margin="dense"
              value={state}
              {...register("state", {
                onChange: (e) => setState(e.target.value),
              })}
              id="state"
              type="text"
              label="State"
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              value={pincode}
              {...register("pincode", {
                onChange: (e) => setpincode(e.target.value),
              })}
              id="pincode"
              label="Pin Code"
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              value={mobile}
              id="mobile"
              {...register("mobile", {
                onChange: (e) => setMobile(e.target.value),
              })}
              label="Mobile Number"
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              value={address}
              id="address"
              {...register("address", {
                onChange: (e) => setAddress(e.target.value),
              })}
              type="text"
              label="Address"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              value={quota}
              {...register("quota", {
                onChange: (e) => setQuota(e.target.value),
              })}
              label="Number of Slots"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {buttonText}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

  