
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock, faTrash } from '@fortawesome/free-solid-svg-icons'
import "./index.css"
import Logo from "../assets/logo.webp"

export default function Index() {
  const [message, setMessage] = useState("Hello world!")


  return (
    <div>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={Logo} alt="Logo" width="30" height="30" class="d-inline-block align-text-top logo-navbar-pedrito" />
            RegisFlow
          </a>
          <div>
            <span class="navbar-text">
              Welcome Pedro León!
            </span>
          </div>

        </div>
      </nav>
      <div className="container">
        <div className="d-flex flex-align-center justify-content-center gap-4 flex-wrap mt-5">
          <button className="btn btn-primary" disabled="true"><FontAwesomeIcon className="me-2" icon={faLock} /> Block</button>
          <button className="btn btn-primary" disabled="true"><FontAwesomeIcon className="me-2" icon={faUnlock} /> Unblock</button>
          <button className="btn btn-danger" disabled="true"><FontAwesomeIcon className="me-2" icon={faTrash} /> Delete</button>
        </div>
        <div className="superbigtableusers border rounded table-responsive">
          {message}
        </div>
      </div>

    </div>
  )
}