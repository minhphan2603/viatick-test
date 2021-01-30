import _ from "lodash";
import gqlRequest from "../util/gqlRequest";

export const getDevices = async (data) => {
  const query = `query
    getSensorsWithIoT(
        $model: Int,
    ) {
        getSensorsWithIoT(
            model: $model,
        ) {
            deviceId
            name
            serial
            mac
            region
            longitude
            latitude
            floor
            distance
            remark
            optional
            active
            date
            live
            battery
            humidity
            temperature
            height
            maxHeight
            x
            y
            z
            tags
            deploymentDate
            compositionData
            unicastAddr
            meshStatus
            status
            error
            lockStatus
            network
            frequency
            server
        }
    }`;
  const response = await gqlRequest({ query, variables: data });
  return _.get(response, "data.getSensorsWithIoT");
};

export const updateDevice = async ({ deviceId, name, serial }) => {
  const query = `mutation
    updateDevice(
          $input: DeviceUpdateInput,
    ) {
        updateDevice(
            input: $input,
        ) {
            deviceId
            name
            serial
        }
    }`;
  const response = await gqlRequest({
    query,
    variables: { input: { deviceId, name, serial } },
  });
  if (_.get(response, "data.updateDevice"))
    return _.get(response, "data.updateDevice");
  throw Error(_.get(response, "errors[0].message"));
};

export const deleteDevices = async (deviceIds = []) => {
  const query = `mutation
      deleteDevices(
        $type: String, $deviceIds: [Int]
      ) {
          deleteDevices(
              type: $type,
              deviceIds: $deviceIds
          ) {
            rows_deleted
          }
      }`;
  const response = await gqlRequest({
    query,
    variables: { type: "", deviceIds },
  });
  if (_.get(response, "data.deleteDevices"))
    return _.get(response, "data.deleteDevices.rows_deleted");
  throw Error(_.get(response, "errors[0].message"));
};
