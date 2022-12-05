import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { SERVER_LINK } from "../../../helpers/config";


export default function ParticipantTable(props) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    // const [organization_id, setOrganizationId] = useState("");    
    const [buttonText, setButtonText] = useState("Add");
    const [editForm, setEditForm] = useState(false);
    const [organizationId, setOrganizationId] = useState("");
    const [open, setOpen] = React.useState(false);
    const [participantId,setParticipantId] = useState('')
    
    const participants = props.participants

  
const handleEditClick = (participantId) => {
        setOpen(true);
        setButtonText("Update");
        setEditForm(true);
        setParticipantId(participantId);
        console.log("participant id "+participantId)
    
        // first find the user with the id
        axios
          .get(`${SERVER_LINK}/participants/${participantId}`)
          .then((response) => {
       
            let singleParticipantData = response.data;
    
            setName(singleParticipantData.name);
            setEmail(singleParticipantData.email);
            setMobile(singleParticipantData.mobile);
            setOrganizationId(singleParticipantData.Organization_id)
            setPassword(singleParticipantData.password)
           
          })
          .catch((err) => {
            console.log(err);
          });
      };



const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "mobile",
    label: "Mobile",
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
const { register, handleSubmit } = useForm();


function createData(name, email, mobile , participantId) {
  const action = (
    <>
      <Button
        onClick={() => handleEditClick(participantId)}
        style={{ marginRight: "5px" }}
        color="success"
        variant="contained"
      >
        Edit
      </Button>

      <Button
        onClick={() => handleRemoveClick(participantId)}
        style={{ marginRight: "5px" }}
        color="error"
        variant="contained"
      >
        Delete
      </Button>
    </>
  );
  return { name, email, mobile, action };
}
const rowsDataArray = participants.map((element) => {
    let name = element.name;
    let email = element.email;
    let mobile = element.mobile;
    let participantId = element.id
    return createData(name, email, mobile,participantId);
  });

const rows = rowsDataArray ;

// for post request to the database

const checkWithDatabase = async (data) => {
    // data.status = true;
    data = JSON.stringify(data);

    // for taking the patch api data
    if (editForm) {
      await axios
        .patch(`${SERVER_LINK}/participants/${participantId}`, data, {
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
            console.log('this is the axios err');
          console.log(err);
        });
    }

    // for new data registration
    else {
      await axios({
        url: `${SERVER_LINK}/participants`,
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
  const handleClickOpen = () => {
    setEditForm(false);
    setName("");
    setEmail("");
    setPassword("")
    setOrganizationId("")
    setMobile("");
    setOpen(true);
    setButtonText("Add");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = async(participantId) => {
    await axios
      .delete(`${SERVER_LINK}/participants/${participantId}`)
      .then((result) => {
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
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
            Participants Data &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={handleClickOpen}>Add Participant</Button>
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
        <DialogTitle>Add Participant</DialogTitle>
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
              label="Participant Name"
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
              value={password}
              id="password"
              {...register("password", {
                onChange: (e) => setPassword(e.target.value),
              })}
              label="Password"
              variant="standard"
            />
            
            {"   "} &nbsp; &nbsp;             
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
              value={organizationId}
              id="organizationId"
              {...register("Organization_id", {
                onChange: (e) => setOrganizationId(e.target.value),
              })}
              label="Organization Id"
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

  