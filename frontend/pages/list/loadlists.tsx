import { Box, List, ListItem, ListItemText, SxProps } from "@mui/material";
import NextLink from "next/link";
import React, { useEffect } from "react";

const boxStyle: SxProps = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
};

type ListProperties = {
  id: number;
  name: string;
};

const LoadIndex = () => {
  const [lists, setLists] = React.useState<ListProperties[]>([]);

  useEffect(() => {
    fetch(`${process.env.HOST}:${process.env.PORT}/loadAll`)
      .then((response) => response.json())
      .then((data) => {
        setLists(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box sx={{ ...boxStyle, width: "100vw", height: "100vh" }}>
      <Box sx={{ ...boxStyle, width: "100vw", height: "80vh" }}>
        <List sx={{ width: "80vw" }}>
          {lists.map((list) => {
            return (
              <ListItem key={list.id} divider disablePadding>
                <NextLink
                  href={{ pathname: `./load`, query: { id: `${list.id}` } }}
                >
                  <ListItemText
                    primary={list.name}
                    id={`item${list.id}`}
                    slotProps={{
                      primary: {
                        fontSize: "20px",
                      },
                    }}
                  />
                </NextLink>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default LoadIndex;
