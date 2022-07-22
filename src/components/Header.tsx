import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Burger,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Text,
} from "@mantine/core";

export type HeaderProps = {
  opened: boolean;
  setopened: Dispatch<SetStateAction<boolean>>;
};

const HeaderComponent: FC<HeaderProps> = ({
  opened,
  setopened,
}: HeaderProps) => {
  // INIT

  // CREATE STYLE
  const usestlyle = createStyles((theme) => ({
    titlename: {
      fontSize: "1rem",
      color: theme.colorScheme == "light" ? "black" : "white",
    },
  }));

  const { classes } = usestlyle();

  return (
    <Header height="3rem">
      <Group position="apart" style={{ height: "3rem" }} px="1rem">
        <Text className={classes.titlename}>Password Manager</Text>

        <MediaQuery largerThan="xs" styles={{ visibility: "hidden" }}>
          <p className="reset">
            <Burger
              opened={false}
              onClick={() => {
                setopened((prev) => {
                  return !prev;
                });
              }}
            />
          </p>
        </MediaQuery>
      </Group>
    </Header>
  );
};

export default HeaderComponent;
