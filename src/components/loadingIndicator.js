import React from "react"
import BarLoader from "react-spinners/BarLoader"

const LoadingIndicator = ({ loading }) => {
  return (
    <BarLoader sizeUnit={"px"} size={30} color={"#123abc"} loading={loading} />
  )
}

export default LoadingIndicator
