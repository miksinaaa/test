import { FC, useEffect, useState } from "react";
import { ICompany } from "../../testData";
import s from "../../App.module.scss";
import RowCompany from "./RowCompany";
import { useActions } from "../../hooks/useActions";

interface ITableCompanies {
  companies: ICompany[];
  checkedCompanies: number[];
  setCheckedCompanies: React.Dispatch<React.SetStateAction<number[]>>;
}

const TableCompanies: FC<ITableCompanies> = ({
  companies,
  setCheckedCompanies,
  checkedCompanies,
}) => {
  const [allCompanies, setAllCompanies] = useState<number[]>([]);

  const { deleteCompany } = useActions();

  const deleteMany = (checkedCompanies: number[]) => {
    checkedCompanies.forEach((id) => {
      deleteCompany(id);
      setCheckedCompanies((prev) => prev.filter((p) => p != id));
    });
  };

  useEffect(() => {
    setAllCompanies(companies.map((company: ICompany) => company.id));
  }, [companies]);

  const checkAllCompanies = () => {
    setCheckedCompanies(
      allCompanies.length == checkedCompanies.length ? [] : allCompanies
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              checked={
                allCompanies.length == checkedCompanies.length ? true : false
              }
              onChange={() => checkAllCompanies()}
              type="checkbox"
            />
          </th>
          <th>Название компании</th>
          <th>Кол-во сотрудников</th>
          <th>Адрес</th>
          <th>
            <button onClick={() => deleteMany(checkedCompanies)}>
              <img src="/delete.svg" alt="" />
              <div className={s.deleteQuantity}>{checkedCompanies.length}</div>
            </button>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {companies?.map((company: ICompany, idx: number) => (
          <RowCompany
            key={idx}
            company={company}
            checkedCompanies={checkedCompanies}
            setCheckedCompanies={setCheckedCompanies}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableCompanies;
