import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import "./noteitem.css";
function NoteItems(props) {
  const { note, updateNote } = props;

  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const handleDelete = () => {
    deleteNote(note._id);
    props.showAlert("Note is deleted successfully", "success");
  };

  let date = note.date;
  date = date.slice(0, -14).split("-").reverse().join("-");

  return (
    <div className="col-sm-4 col-md-3 my-2 ">
      <div className="card mh-100">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title} </h5>
            <p>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={handleDelete}
              />
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              />
            </p>
          </div>
          <p>
            <b>{note.tag}</b>
          </p>
          {/* Parse the desciption */}
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: note.description }}
          ></p>
          <p className="text-secondary small text-end ">
            <small>{date} </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoteItems;
