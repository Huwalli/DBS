import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [user_id, setUserId] = useState(0);
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      user_id: user_id,
      gender: gender,
      education: education,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          user_id: user_id,
          gender: gender,
          education: education,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  user_id: val.user_id,
                  gender: val.gender,
                  education: val.education,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.user_id !== id;
        })
      );
    });
  };

  const [newWage, setNewWage] = useState(0);

  return (
    <div className="App">
      <div className="information">
        <label>User ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setUserId(event.target.value);
          }}
        />
        <label>Gender:</label>
        <input
          type="text"
          onChange={(event) => {
            setGender(event.target.value);
          }}
        />
        <label>Education:</label>
        <input
          type="text"
          onChange={(event) => {
            setEducation(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee" key={key}>
              <div>
                <h3>User ID: {val.user_id}</h3>
                <h3>Gender: {val.gender}</h3>
                <h3>Education: {val.education}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.user_id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteEmployee(val.user_id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
