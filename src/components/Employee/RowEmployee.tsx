import { ChangeEvent, FC, useEffect, useState } from "react";
import { IEmployee } from "../../testData";
import { useActions } from "../../hooks/useActions";
import { editEmployee } from "../../store/test.slice";

interface IRowEmployee {
  companyId: number;
  checkedEmployees: number[];
  employee: IEmployee;
  setCheckedEmployees: React.Dispatch<React.SetStateAction<number[]>>;
}

const RowEmployee: FC<IRowEmployee> = ({
  checkedEmployees,
  employee,
  setCheckedEmployees,
  companyId,
}) => {
  const { deleteEmployee } = useActions();
  const [status, setStatus] = useState<boolean>(false);
  const checkEmployee = (id: number) => {
    setCheckedEmployees((prev: number[]) =>
      prev.includes(id)
        ? [...prev.filter((p: number) => p != id)]
        : [...prev, id]
    );
  };

  const [data, setData] = useState<{
    name: string;
    post: string;
    surname: string;
  }>({
    surname: "",
    name: "",
    post: "",
  });

  useEffect(() => {
    setData({
      surname: employee.surname,
      name: employee.name,
      post: employee.post,
    });
  }, [employee]);

  const editOne = () => {
    setStatus(!status);
    status &&
      editEmployee({
        idCompany: companyId,
        idEmployee: employee.id,
        surname: data.surname,
        name: data.name,
        post: data.post,
      });
  };

  const deleteOne = (idCompany: number, idEmployee: number) => {
    deleteEmployee({ idCompany, idEmployee });
    if (checkedEmployees.includes(idEmployee)) {
      setCheckedEmployees((prev) => prev.filter((p) => p != idEmployee));
    }
  };

  return (
    <tr
      style={
        checkedEmployees.includes(employee.id)
          ? {
              background: "#d13b7b",
            }
          : {}
      }
    >
      <td>
        <input
          type="checkbox"
          checked={checkedEmployees.includes(employee.id) ? true : false}
          onChange={() => checkEmployee(employee.id)}
        />
      </td>
      <td>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, surname: e.target.value })
          }
          readOnly={!status}
          value={data.surname}
          type="text"
        />
      </td>
      <td>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, name: e.target.value })
          }
          readOnly={!status}
          value={data.name}
          type="text"
        />
      </td>
      <td>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, post: e.target.value })
          }
          readOnly={!status}
          value={data.post}
          type="text"
        />
      </td>
      <td>
        <button onClick={() => deleteOne(companyId, employee.id)}>
          <img src="/delete.svg" alt="" />
        </button>
      </td>
      <td>
        <button onClick={() => editOne()}>
          <img src={status ? `check-mark.svg` : `edit.svg`} alt="" />
        </button>
      </td>
    </tr>
  );
};

export default RowEmployee;
