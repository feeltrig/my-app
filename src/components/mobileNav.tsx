import { Drawer } from "@mantine/core";
import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";

export interface MobileNavINF {
  opened: boolean;
  setopened: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const MobileNav: FC<MobileNavINF> = ({ opened, setopened, children }) => {
  return (
    <Drawer
      onClose={() => {
        setopened(false);
      }}
      opened={opened}
      title="Menu"
      position="left"
      size="full"
      padding="xl"
    >
      {children}
    </Drawer>
  );
};

export default MobileNav;
