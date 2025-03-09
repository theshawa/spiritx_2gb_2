import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertColor, IconButton, Snackbar } from "@mui/material";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export interface SnackBarData {
  message: string;
  type: AlertColor;
}
export const SnackBarContext = createContext<{
  data: SnackBarData;
  setData: (message: SnackBarData) => void;
}>({
  data: {
    message: "",
    type: "info",
  },
  setData() {},
});

export const useSnackBar = () => {
  const { setData } = useContext(SnackBarContext);
  const showSnackBar = useCallback((type: AlertColor, msg: string) => {
    setData({
      message: msg,
      type: type,
    });
  }, []);
  return { showSnackBar };
};

export const SnackBarWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SnackBarData>({ message: "", type: "info" });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <SnackBarContext.Provider
      value={{
        data,
        setData: (v) => {
          setData(v);
          setOpen(true);
        },
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity={data?.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {data?.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
