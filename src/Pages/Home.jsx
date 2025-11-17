import React, { useEffect, useState } from "react";
import { applyCollege, getCollegeData } from "../services/allAPI";
import Swal from "sweetalert2";

const Home = () => {
  const [country, setCountry] = useState("");
  const [collegeData, setCollegeData] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    getCollegeDetails();
  }, []);

  const getCollegeDetails = async () => {
    try {
      let apiResponse = await getCollegeData(country);
      if (apiResponse.status == 200) {
        setCollegeData(apiResponse.data);
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

  const onClickApply = async () => {
    try {
      let reqBody = {
        collegeName: selectedCollege.name,
        collegeCountry: selectedCollege.country,
        collegeDomain: selectedCollege.domains[0],
        collegeWebsite: selectedCollege.web_pages[0],
        courseName: courseName,
        status: "Applied",
      };
      let apiResponse = await applyCollege(reqBody);
      if (apiResponse.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Applied",
          text: "Successfully applied",
        });
        document.getElementById("my_modal_1").close();
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Failed to add college",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Failed to add college",
      });
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
          <h2 className="text-2xl my-4 text-sky-600 font-semibold">
            Search College
          </h2>
          <div className="flex flex-row items-end gap-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select a Country</legend>
              <input
                type="text"
                className="input border rounded-xl border-slate-300 w-70"
                placeholder="Select a country"
                list="countries"
                onChange={(e) => setCountry(e.target.value)}
              />
              <datalist id="countries">
                <option value="India"></option>
                <option value="United States"></option>
                <option value="United Kingdom"></option>
                <option value="Canada"></option>
                <option value="Australia"></option>
                <option value="Germany"></option>
                <option value="France"></option>
                <option value="Italy"></option>
                <option value="Spain"></option>
                <option value="Brazil"></option>
                <option value="China"></option>
                <option value="Japan"></option>
                <option value="Netherlands"></option>
                <option value="Sweden"></option>
                <option value="Norway"></option>
                <option value="Finland"></option>
                <option value="Switzerland"></option>
                <option value="Mexico"></option>
                <option value="Argentina"></option>
                <option value="South Africa"></option>
                <option value="New Zealand"></option>
                <option value="Singapore"></option>
                <option value="Malaysia"></option>
                <option value="United Arab Emirates"></option>
                <option value="Saudi Arabia"></option>
                <option value="Pakistan"></option>
                <option value="Bangladesh"></option>
                <option value="Sri Lanka"></option>
              </datalist>
            </fieldset>

            <div>
              <button
                className="btn m-1 rounded-2xl border-0 bg-sky-200 text-sky-600 hover:bg-sky-300 hover:text-sky-700"
                onClick={getCollegeDetails}
              >
                Search
              </button>
            </div>
          </div>

          <div className="shadow-2xl border border-slate-100 p-5 mt-10 rounded-2xl">
            <h2 className="text-xl my-5 text-sky-600 font-semibold">
              Top Colleges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {collegeData.length > 0 ? (
                collegeData.map((eachCollege, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 shadow-lg rounded-2xl p-3 flex flex-row gap-3"
                  >
                    <div className="avatar m-0">
                      <div className="w-24 h-24 rounded overflow-hidden bg-white flex items-center justify-center">
                        {eachCollege.domains.length > 0 ? (
                          <img
                            className="object-contain w-full h-full"
                            src={`https://logo.clearbit.com/${eachCollege.domains[0]}`}
                            alt={eachCollege.name}
                          />
                        ) : (
                          <img
                            className="object-contain w-14 h-14"
                            src="https://cdn-icons-png.flaticon.com/512/2231/2231649.png"
                            alt={eachCollege.name}
                          />
                        )}
                      </div>
                    </div>

                    <div className="w-full flex flex-col justify-center">
                      <h3 className="text-lg font-semibold">
                        {eachCollege.name}
                      </h3>
                      <h5 className="text-sm text-slate-400">
                        {eachCollege.country}
                      </h5>
                      <a
                        className="text-sm mt-1"
                        href={eachCollege.web_pages?.[0]}
                        target="_blank"
                      >
                        {eachCollege.web_pages?.[0]}
                      </a>

                      <div className="mt-2 text-end">
                        <button
                          className="btn m-1 rounded-2xl border-0 bg-sky-200 text-sky-600 hover:bg-sky-300 hover:text-sky-700"
                          onClick={() => {
                            setSelectedCollege(eachCollege);
                            document.getElementById("my_modal_1").showModal();
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <h1 className="text-lg text-red-500">Select a country</h1>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white rounded-2xl">
          <h3 className="text-2xl font-semibold my-3">
            {selectedCollege.name}
          </h3>
          <h3 className="text-sm font-semibold my-3">
            {selectedCollege.country}
          </h3>
          <h3 className="font-bold text-lg">Course name</h3>
          <input
            type="text"
            placeholder="Course name"
            className="input border border-slate-300 rounded-xl mt-2 w-full"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <div className="modal-action">
            <button
              type="button"
              className="btn m-1 rounded-2xl border-0 bg-sky-200 text-sky-600 hover:bg-sky-300 hover:text-sky-700"
              onClick={onClickApply}
            >
              Apply
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
