import React from "react";
import {
  Table,
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import Spinner from "../../component/Spinner";
import { getDevices, updateDevice, deleteDevices } from "../../services/device";
import UpdateDeviceModal from "./components/UpdateDeviceModal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      devices: [],
      modal: undefined,
      updatingDevice: {},
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    getDevices({ model: 19 }).then((res) => {
      this.setState({
        loading: false,
        devices: res,
      });
    });
  }
  toggleUpdateDeviceModal = (deviceId) => {
    this.setState({
      modal: deviceId,
      updatingDevice:
        this.state.devices.find((device) => device.deviceId === deviceId) || {},
    });
  };
  handleChangeInput = (event) => {
    this.setState({
      updatingDevice: {
        ...this.state.updatingDevice,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleUpdateDevice = () => {
    this.setState({
      updatingDevice: {
        ...this.state.updatingDevice,
        isUpdating: true,
      },
    });
    updateDevice(this.state.updatingDevice)
      .then((res) => {
        if (res) {
          this.setState({
            loading: false,
            modal: undefined,
            devices: this.state.devices.map((device) => {
              if (device.deviceId !== this.state.updatingDevice.deviceId)
                return device;
              return {
                ...device,
                ...res,
              };
            }),
            updateDevice: {},
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          updatingDevice: {
            ...this.state.updatingDevice,
            isUpdating: false,
            errorMessage: err.message,
          },
        });
      });
  };
  handleDeleteDevice = (deviceId) => {
    this.setState({ loading: true });
    deleteDevices([deviceId])
      .then((res) => {
        if (res) {
          this.setState({
            loading: false,
            devices: this.state.devices.filter(
              (device) => device.deviceId !== deviceId
            ),
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      })
      .catch((_err) => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    const { modal, devices, updatingDevice, loading } = this.state;
    return (
      <>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Label</th>
              <th>Serial Code</th>
              <th>Last Saved region</th>
              <th>Live</th>
              <th>Status</th>
              <th>Created Since</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, i) => (
              <tr key={device.deviceId}>
                <th scope="row">{i + 1}</th>
                <td>{device.deviceId}</td>
                <td>{device.name}</td>
                <td>{device.serial}</td>
                <td>{device.region}</td>
                <td>
                  {new Date(device.live).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "medium",
                    hour12: false,
                  })}
                </td>
                <td>{device.status}</td>
                <td>
                  {new Date(device.date).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "medium",
                    hour12: false,
                  })}
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() =>
                      this.toggleUpdateDeviceModal(device.deviceId)
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </Button>
                  <Button color="danger" id={`PopoverFocus-${device.deviceId}`}>
                    <i className="fa fa-trash"></i>
                  </Button>
                  <UncontrolledPopover
                    trigger="focus"
                    placement="bottom"
                    target={`PopoverFocus-${device.deviceId}`}
                  >
                    <PopoverHeader>Delete device comfirmation</PopoverHeader>
                    <PopoverBody>
                      Would you like to delete this device!
                      <Button
                        size="sm"
                        color="warning"
                        onClick={() => this.handleDeleteDevice(device.deviceId)}
                      >
                        Confirm
                      </Button>
                    </PopoverBody>
                  </UncontrolledPopover>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <UpdateDeviceModal
          isOpen={!!modal}
          toggle={this.toggleUpdateDeviceModal}
          handleChangeInput={this.handleChangeInput}
          updatingDevice={updatingDevice}
          handleUpdateDevice={this.handleUpdateDevice}
        />
        <Spinner loading={loading} />
      </>
    );
  }
}

export default Home;
