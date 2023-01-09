export default function Modal({ modalTitle = '', modalFooter = '', targetId, children }) {
  return (
    <div className="modal fade" id={targetId}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">{modalFooter}</div>
        </div>
      </div>
    </div>
  );
}
