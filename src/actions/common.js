import { message } from "antd";

message.config({
  duration: 3, // 3 second
});

export async function handleSuccess(messageDetail) {
  message.success(messageDetail);
}

export async function handleCatch(error) {
  const errorMessage = error?.response?.statusText || "Something went Wrong";

  if (!!errorMessage) {
    message.error(errorMessage);
  } else {
    console.log(error?.response?.data);
  }
}
