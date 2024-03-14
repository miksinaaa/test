import { FC, useEffect, useState } from "react";
import { ICompany, IEmployee } from "../../testData";
import s from "../../App.module.scss";
import RowEmployee from "./RowEmployee";
import { useActions } from "../../hooks/useActions";

interface ITableEmployees {
  company: ICompany;
}

const TableEmployees: FC<ITableEmployees> = ({ company }) => {
  const { employees, id: idCompany } = company;

  const [allEmployees, setAllEmployees] = useState<number[]>([]);
  const [checkedEmployees, setCheckedEmployees] = useState<number[]>([]);

  useEffect(() => {
    setAllEmployees(employees.map((employee: IEmployee) => employee.id));
  }, [company]);

  const checkAllEmployees = () => {
    setCheckedEmployees(
      allEmployees.length == checkedEmployees.length ? [] : allEmployees
    );
  };

  const { deleteEmployee } = useActions();

  const deleteMany = () => {
    checkedEmployees.forEach((idEmployee) => {
      deleteEmployee({ idCompany, idEmployee });
      setCheckedEmployees((prev) => prev.filter((p) => p != idEmployee));
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              checked={
                allEmployees.length == checkedEmployees.length ? true : false
              }
              onChange={() => checkAllEmployees()}
              type="checkbox"
            />
          </th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Должность</th>
          <th>
            <button onClick={() => deleteMany()}>
              <img src="/delete.svg" alt="" />
              <div className={s.deleteQuantity}>{checkedEmployees.length}</div>
            </button>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees?.map((employee: IEmployee, idx: number) => (
          <RowEmployee
            companyId={company.id}
            key={idx}
            checkedEmployees={checkedEmployees}
            employee={employee}
            setCheckedEmployees={setCheckedEmployees}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableEmployees;
