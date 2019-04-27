import { CLOSE_MODAL, ADD_RESERVATION } from "../actions"
import { useGlobalState } from "../services/state"
import Modal from "react-modal"
import React, { useState } from "react"
import LoadingIndicator from "./loadingIndicator"
import firebase from "../services/firebase"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const DayReserveModal = () => {
  const [
    { isModalOpen, selectedDate, uid, displayName },
    dispatch,
  ] = useGlobalState()
  const formattedDate = selectedDate && selectedDate.format("DD-MM-YYYY")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL })
  }

  const handleReservation = () => {
    const { store } = firebase

    setLoading(true)
    store()
      .collection("reservations")
      .add({ date: formattedDate, user: uid, name: displayName })
      .then(() => {
        dispatch({
          type: ADD_RESERVATION,
          payload: { date: formattedDate, uid, name: displayName },
        })
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        setError(e)
      })

    closeModal()
  }

  const notLoggedInModal = (
    <>
      <div style={{ marginBottom: "1em" }}>
        Kirjaudu sisään varataksesi vartiovuoroja!
      </div>
      <button style={{ ...styles.size, ...styles.no }} onClick={closeModal}>
        Sulje
      </button>
    </>
  )

  const loggedInModal = (
    <>
      {error && <div>{`Varaus epäonnistui:  ${error}`}</div>}
      <div className="grid-middle">
        <div className="col">{`Tahdotko merkitä vartiovuoron päivälle ${formattedDate}?`}</div>
      </div>
      <div className="grid">
        {!loading && (
          <>
            <div className="col">
              <button
                style={{ ...styles.size, ...styles.no }}
                onClick={closeModal}
              >
                Sulje
              </button>
            </div>
            <div className="col">
              <button
                style={{ ...styles.size, ...styles.yes }}
                onClick={handleReservation}
              >
                Kyllä
              </button>
            </div>
          </>
        )}
        {loading && (
          <div className="col">
            <LoadingIndicator loading={loading} />
          </div>
        )}
      </div>
    </>
  )

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {uid ? loggedInModal : notLoggedInModal}
    </Modal>
  )
}

const styles = {
  size: {
    width: "100%",
    height: "100%",
  },
  yes: {
    backgroundColor: "forestgreen",
  },
  no: {
    backgroundColor: "red",
  },
}

export default DayReserveModal
