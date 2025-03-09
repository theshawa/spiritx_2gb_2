export const getErrorMessage = (error: any) => {
  let message = "";
  console.log({ error });

  if (error.response) {
    if (error.response.data.message) {
      message = error.response.data.message;
    } else {
      if (typeof error.response.data === "string") {
        message = error.message;
      } else message = error.response.data;
    }
  }
  return message || error.message || error.toString();
};
