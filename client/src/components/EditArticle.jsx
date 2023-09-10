import React, { useState } from 'react';
import axios from "axios";
import { FILL_ALL_DATA } from "../Data";
import { Link } from "react-router-dom";

const SaveModal = (props) => {
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          onClick={() => {
            props.setSaveShowModal(false);
          }}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Article Edited
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your article is edited successfully to the Foodity!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Link
                  to="/articles"
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};  

const EditArticle = (props) => {
    
  const [msg, setMsg] = useState("");
  const [showSaveModal, setSaveShowModal] = useState(false);
  const [currArticle,setCurrArticle] = useState(props.article)

  const handleChange = (e) => {
    e.preventDefault();
    setMsg("");
    setCurrArticle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(currArticle)
  };


  const onSave = (e) => {
    e.preventDefault();
    console.log(currArticle)
    if (
      currArticle.title !== "" &&
      currArticle.tags !== "" &&
      currArticle.description !== ""
    ) {
      axios
        .put("http://localhost:5000/article/updatearticle", {
          _id: currArticle._id,
          title: currArticle.title,
          tag: currArticle.tags,
          description: currArticle.description,
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0,5)
        })
        .then((response) => {
          setSaveShowModal(true);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });
      return;
    }
    setMsg(FILL_ALL_DATA);
  };


  return (
    <div className="mx-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-20">
        <h1 className="text-3xl font-semibold mb-8">Edit Article</h1>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Title
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="title"
              type="text"
              defaultValue={`${props.article.title}`}
              placeholder="5 Tips to Preserving vegetables.."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Tags
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="tags"
              type="text"
              defaultValue={`${props.article.tag}`}
              placeholder="vegetables,dairy,health..."
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Description
            </label>
            <textarea
              rows="4"
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="description"
              type="text"
            
              defaultValue={`${props.article.description}`}
              placeholder="Write description on article"
              onChange={handleChange}
            />
          </div>
        </div>


        <p className="text-sm text-red-600 italic text-center mt-1">{msg}</p>
        <button
          onClick={onSave}
          className="ml-auto mr-auto w-1/4 mt-5 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-500 focus:ring-2 font-semibold"
        >
          Post
        </button>
      </div>
      {showSaveModal && (
        <SaveModal setSaveShowModal={setSaveShowModal}></SaveModal>
      )}
    </div>
  )
}



export default EditArticle