import axios from "axios";
import Echo from "laravel-echo";

import Pusher from "pusher-js";

const pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",
  key: "ftqnzv5m2afcgjtfwe6f",
  wsHost: "api.find-roommate.test",
  wsPort: 8080,
  wssPort: 8080,
  forceTLS: false,
  enabledTransports: ["ws", "wss"],
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post(
            "http://api.find-roommate.test/broadcasting/auth",
            {
              socket_id: socketId,
              channel_name: channel.name,
            },
            {
              withCredentials: true,
              withXSRFToken: true,
            }
          )
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

export default echo;
