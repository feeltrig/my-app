import { Avatar, Button, Group, Modal, Text } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { appState, useMainApp } from "../AppState/appstate";

// NOTIFICATION IMPORT
import { showNotification } from "@mantine/notifications";

// IMPORT INTERFACES
import { contextTYPE } from "../AppState/appstate";
import { appStateTYPE } from "../AppState/appstate";

// IMPORT SVGS
import user from "../Images/user.svg";
import { appStateINF } from "../interfaces/appStateINF";
import { useNavigate } from "react-router-dom";

// NOTIFICATION FUNCTION
export const notify = (inputmessage: string): void => {
  showNotification({
    title: "Message",
    message: inputmessage,
  });
};

const MyAccount = () => {
  // INITIALIZATIONS
  // main state
  // navigation
  // delete modal
  const { mainappstate, setmainappstate }: contextTYPE = useMainApp();
  const { username, userpassword, pincode } = mainappstate;
  const navigate = useNavigate();
  const [deleteAccModalopen, setDeleteAccModalopen] = useState<boolean>(false);

  // MAIN INFO STYLE
  const mainInfoStyle: React.CSSProperties = {
    textTransform: "uppercase",
  };

  // DELETE ACCOUNT
  const handleAccountDelete = () => {
    axios
      .post("http://localhost:3001/user/deleteaccount", mainappstate)
      .then((res) => {
        if (res.status < 400) {
          notify(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        notify(err.message);
      });

    setmainappstate(appState);
    navigate("/");
  };

  return (
    <div>
      {/* notification modals */}

      <Modal
        opened={deleteAccModalopen}
        onClose={() => setDeleteAccModalopen(false)}
        title="Alert"
      >
        <Text>Are you sure you want to delete your account</Text>
        <Button mt={"3rem"} onClick={handleAccountDelete}>
          Yes
        </Button>
      </Modal>

      {/* user profile */}
      <Group>
        <Avatar src={user} size="xl" radius="md" />
        <div>
          <Text size="sm" color="dimmed">
            My Accpunt
          </Text>
          {/* username */}
          <Text size="xl" weight={700} style={mainInfoStyle}>
            {username}
          </Text>
          {/* password */}
          <Text size="xl" weight={700} style={mainInfoStyle}>
            {userpassword}
          </Text>
          {/* pincode */}
          <Text size="xl" weight={700} style={mainInfoStyle}>
            {pincode}
          </Text>
          {/* delete account */}
          <Button
            onClick={() => {
              setDeleteAccModalopen(true);
            }}
          >
            Delete Account
          </Button>
        </div>
      </Group>
    </div>
  );
};

export default MyAccount;
