import {
  CardActionArea,
  CardContent,
  SxProps,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";

type SelectionProps = {
  text: string;
  action?: (event: React.MouseEvent<HTMLElement>) => void;
};

const TextStyle: SxProps = {
  color: "primary.dark",
  "&:hover": {
    color: "primary.light",
  },
  fontSize: { xs: 30, sm: 35, md: 40, lg: 45, xl: 50 },
  fontWeight: { xs: 2, sm: 4, m: 4, lg: 5, xl: 6 },
};

const contentStyle: SxProps = {
  border: 5,
  borderColor: "primary.dark",
  backgroundColor: "secondary.main",
  "&:hover": {
    borderColor: "primary.light",
    backgroundColor: "secondary.dark",
  },
  textAlign: "center",
};

// Template for selection button components
const SelectionCard = ({ text, action }: SelectionProps) => {
  return (
    <Card
      sx={{
        width: "30vw",
      }}
    >
      <CardActionArea onClick={action}>
        <CardContent sx={contentStyle}>
          <Typography sx={TextStyle}>{text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SelectionCard;
