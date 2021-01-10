import React from "react"
import Modal from "@material-ui/core/Modal"
import CircularProgress from "@material-ui/core/CircularProgress"

import "./Spinner.css"

interface SpinnerProps {
  open: boolean
  onClose: (boolean) => void
  label: string
  describe: string
}

const spinner: React.FC<SpinnerProps> = ({
  open,
  onClose,
  label,
  describe,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={label}
      aria-describedby={describe}
    >
      <CircularProgress
        size="40rem"
        className="spinner"
        style={{ position: "relative", top: "8rem", left: "31rem" }}
        color="secondary"
      />
    </Modal>
  )
}

export default spinner
