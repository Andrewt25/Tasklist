import { createTheme } from "@mui/material/styles";

const pageTheme = createTheme({
  palette: {
    primary: {
      main: "#4623CD",
      light: "#187BCD",
      dark: "#311990",
    },
    secondary: {
      main: "#CD6C18",
      dark: "#904B11",
    },
  },

  typography: {
    fontFamily: "Times New Roman",
  },
});

export default pageTheme;
