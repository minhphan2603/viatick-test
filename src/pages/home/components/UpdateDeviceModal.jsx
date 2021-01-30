import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

class UpdateDeviceModal extends React.Component {
  render() {
    const {
      isOpen,
      toggle,
      handleChangeInput,
      updatingDevice,
      handleUpdateDevice,
    } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={() => toggle()} centered>
        <ModalHeader toggle={() => toggle()}>UPDATE DEVICE</ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>ID</InputGroupText>
            </InputGroupAddon>
            <Input type="text" value={updatingDevice.deviceId} disabled />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Label</InputGroupText>
            </InputGroupAddon>
            <Input
              name="name"
              type="text"
              value={updatingDevice.name}
              onChange={handleChangeInput}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Serial</InputGroupText>
            </InputGroupAddon>
            <Input
              name="serial"
              type="text"
              value={updatingDevice.serial}
              onChange={handleChangeInput}
            />
          </InputGroup>
          <span className="error-message">{updatingDevice.errorMessage}</span>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Region</InputGroupText>
            </InputGroupAddon>
            <Input type="text" value={updatingDevice.region} disabled />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleUpdateDevice()}
            disabled={updatingDevice.isUpdating}
          >
            {updatingDevice.isUpdating ? "Updating..." : "Update"}
          </Button>
          <Button
            color="secondary"
            onClick={() => toggle()}
            disabled={updatingDevice.isUpdating}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default UpdateDeviceModal;
