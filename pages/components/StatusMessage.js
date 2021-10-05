import React, { useEffect } from "react";
import { Message, Icon } from "semantic-ui-react";
import useInterval from "../api/useInterval";
import { INITIAL_TRANSACTION_STATE } from "../api/utils/dataMaps";

//** TODO: clear error and success messages after a timeout period properly - handle state */
const StatusMessage = ({
  status,
  setTransactionState,
  useTimeout,
  ...props
}) => {
  const REFRESH_INTERVAL = 40000;
  useInterval(async () => {
    {
      if (!status.loading && useTimeout) {
        setTransactionState(INITIAL_TRANSACTION_STATE);
      }
    }
  }, REFRESH_INTERVAL);

  return (
    <>
      {status ? (
        <div>
          <Message
            compact
            icon
            negative={Boolean(status.error)}
            success={Boolean(status.success) && !Boolean(status.loading)}
            info={Boolean(status.loading)}
            warning={Boolean(status.warning)}
          >
            <Icon
              name={
                status.loading
                  ? "circle notched"
                  : status.error
                  ? "times circle"
                  : status.success
                  ? "check circle"
                  : "exclamation circle"
              }
              loading={Boolean(status.loading)}
            />
            <Message.Content>
              {Boolean(status.success) && !Boolean(status.loading) && (
                <Message.Header style={{ paddingBottom: "10px" }}>
                  Transaction Success!
                </Message.Header>
              )}
              {status.loading
                ? status.loading
                : status.error
                ? status.error
                : status.success
                ? status.success
                : status.warning}
            </Message.Content>
          </Message>
        </div>
      ) : null}
    </>
  );
};

export default StatusMessage;
