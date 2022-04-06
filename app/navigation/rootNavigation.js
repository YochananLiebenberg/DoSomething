import React from "react";

export let navigationRef = React.createRef();

const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export default {
  navigate,
};
