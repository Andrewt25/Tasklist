import { Box, SxProps, Typography } from "@mui/material";
import NextLink from "next/link";
import SelectionCard from "@/components/selectionCard";

const displaySuper: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
// style for top level parent box
const mainDisplay: SxProps = {
  ...displaySuper,
  width: "100vw",
  height: "100vh",
  backgroundColor: "primary.dark",
};
// style for inner box containing welcome message
const welcomeDisplay: SxProps = {
  ...displaySuper,
  width: "auto",
  height: "auto",
  backgroundColor: "primary.main",
  padding: "30px",
  gap: 5,
  border: 1,
  borderColor: "secondary.main",
};

const TextStyle: SxProps = {
  color: "secondary.main",
  fontSize: { xs: 30, sm: 50, md: 70, lg: 90, xl: 110 },
};

const Home = () => {
  return (
    <Box sx={mainDisplay}>
      <Box sx={welcomeDisplay}>
        <Typography sx={TextStyle}>Welcome to TaskList</Typography>
        <NextLink href={`list/new`}>
          <SelectionCard text="Create New" />
        </NextLink>
        <NextLink href={{ pathname: `list/load`, query: { id: "1" } }}>
          <SelectionCard text="Load Existing" />
        </NextLink>
      </Box>
    </Box>
  );
};

export default Home;
