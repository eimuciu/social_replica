//MUI
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
//Time ago
import ReactTimeAgo from "react-time-ago";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: "16px",
  },
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
    color: "grey",
  },
  avatar: { width: "32px", height: "32px" },
  textAreaStyles: { width: "100%" },
}));

const DialogTitle = ({ children, onClose, ...other }) => {
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const EditTextDialog = ({
  isOpen,
  profilePicture,
  credentials,
  textBody,
  handleChange,
  updateDetails,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle onClose={onClose}>
        <Grid container wrap="nowrap">
          <Avatar src={profilePicture} />
          <Grid style={{ marginLeft: "10px" }} container direction="column">
            <Typography paragraph>
              {credentials === undefined ? null : credentials.userHandle}
            </Typography>
            <Typography paragraph variant="caption">
              {credentials === undefined ? null : (
                <ReactTimeAgo date={credentials.createdAt} locale="en-US" />
              )}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <MuiDialogContent>
        <TextField
          onChange={handleChange}
          className={classes.textAreaStyles}
          multiline
          value={textBody}
          name="comment"
          variant="outlined"
        />
      </MuiDialogContent>
      <MuiDialogActions>
        <Button
          onClick={() => {
            onClose();
            updateDetails();
          }}
          color="primary"
        >
          Save changes
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};

export default EditTextDialog;
