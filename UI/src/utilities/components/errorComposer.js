
const errorComposer = (error) => {
  //const toast = useRef(null);
  return () => {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode === 503) {
      error.response.data.msg = error.response.data.error;
      return error;
    }
    if (statusCode === 404) {
      //notifier.error("The requested resource does not exist or has been deleted");
    }
    if (statusCode === 401) {
      ///notifier.error("Please login to access this resource");
    } else {
      console.log("error.response", error.response.data.msg);
    }
  };
};
export default errorComposer;
