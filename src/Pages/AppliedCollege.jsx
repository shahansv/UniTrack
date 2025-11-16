import React, { useEffect, useState } from "react";
import {
  deleteCollege,
  editCollege,
  getAppliedCollegeData,
} from "../services/allAPI";
import Swal from "sweetalert2";

const AppliedCollege = () => {
  const [appliedCollegeData, setAppliedCollegeData] = useState("");
  const [editCourseName, setEditCourseName] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    displayAplliedCollege();
  }, []);

  const displayAplliedCollege = async () => {
    try {
      let apiResponse = await getAppliedCollegeData();
      if (apiResponse.status == 200) {
        setAppliedCollegeData(apiResponse.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Failed to fetch data",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Failed to fetch data",
      });
    }
  };

  const deleteAppliedCollege = async (id) => {
    try {
      let apiResponse = await deleteCollege(id);
      if (apiResponse.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "College Delete",
        });
        displayAplliedCollege();
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Failed to delete data",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Failed to delete data",
      });
    }
  };

  const editCollegeDetails = async () => {
    try {
      let reqBody = {
        courseName: editCourseName,
        status: editStatus,
      };
      let apiResponse = await editCollege(editId, reqBody);
      if (apiResponse.status == 200) {
        setEditId("");
        setEditCourseName("");
        setEditStatus("");
        Swal.fire({
          icon: "success",
          title: "Edited",
          text: "College details edited",
        });
        document.getElementById("my_modal_1").close();
        displayAplliedCollege();
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Failed to edit data",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Failed to edit data",
      });
    }
  };

  const closeModal = () => {
    setEditId("");
    setEditCourseName("");
    setEditStatus("");
  };

  const renderStatus = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            {status}
          </span>
        );

      case "Rejected":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
            {status}
          </span>
        );

      case "Interview":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
            {status}
          </span>
        );

      case "Applied":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
            {status}
          </span>
        );

      default:
        return (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <>
      <h1 className="text-center m-10 text-3xl font-semibold text-sky-600">
        Applied Colleges
      </h1>
      <div className="bg-white m-5 rounded-2xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table p-3">
            {/* head */}
            <thead>
              <tr>
                <th>College</th>
                <th>Course</th>
                <th>Website</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {appliedCollegeData.length > 0 ? (
                appliedCollegeData.map((eachCollege, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {eachCollege.collegeDomain != "" ? (
                              <img
                                className="object-contain w-full h-full"
                                src={`https://logo.clearbit.com/${eachCollege.collegeDomain}`}
                                alt={eachCollege.collegeName}
                              />
                            ) : (
                              <img
                                className="object-contain w-14 h-14"
                                src="https://cdn-icons-png.flaticon.com/512/2231/2231649.png"
                                alt={eachCollege.collegeName}
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {eachCollege.collegeName}
                          </div>
                          <div className="text-sm opacity-50">
                            {eachCollege.collegeCountry}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{eachCollege.courseName}</td>
                    <td>
                      <a href={eachCollege.collegeWebsite} target="_blank">
                        {eachCollege.collegeWebsite}
                      </a>
                    </td>
                    <td>{renderStatus(eachCollege.status)}</td>
                    <td>
                      <button
                        className="btn m-1 bg-amber-100 text-amber-500 rounded-2xl border-0 hover:bg-amber-200 hover:shadow-lg hover:text-amber-600"
                        onClick={() => {
                          setEditId(eachCollege.id);
                          setEditCourseName(eachCollege.courseName);
                          setEditStatus(eachCollege.status);
                          document.getElementById("my_modal_1").showModal();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn m-1 bg-red-100 text-red-500 rounded-2xl border-0 hover:bg-red-200 hover:shadow-lg hover:text-red-600"
                        onClick={() => deleteAppliedCollege(eachCollege.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr colSpan={5}>
                  <td>No College added</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white rounded-2xl">
          <h3 className="font-bold text-lg">Edit</h3>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Course Name</legend>
            <input
              type="text"
              placeholder="Type here"
              className="input border border-slate-300 rounded-xl mt-2 w-full"
              value={editCourseName}
              onChange={(e) => setEditCourseName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Status</legend>
            <select
              defaultValue="Pick a browser"
              className="select bg-white rounded-2xl border border-slate-200 w-full"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option disabled={true} className="font-semibold">
                {editStatus}
              </option>
              <option className="font-semibold">Accepted</option>
              <option className="font-semibold">Applied</option>
              <option className="font-semibold">Rejected</option>
              <option className="font-semibold">Interview</option>
            </select>
            <span className="label">Optional</span>
          </fieldset>

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn m-1 bg-gray-100 text-gray-500 rounded-2xl border-0 hover:bg-gray-200 hover:shadow-lg hover:text-gray-600"
                onClick={closeModal}
              >
                Close
              </button>
            </form>
            <button
              type="button"
              className="btn m-1 bg-amber-100 text-amber-500 rounded-2xl border-0 hover:bg-amber-200 hover:shadow-lg hover:text-amber-600"
              onClick={editCollegeDetails}
            >
              Edit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AppliedCollege;
