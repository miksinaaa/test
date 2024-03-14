import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ICompany } from "../../testData";
import s from "../../App.module.scss";
import TableCompanies from "./TableCompanies";
import { useActions } from "../../hooks/useActions";

interface ICompanies {
  companies: ICompany[];
  checkedCompanies: number[];
  setCheckedCompanies: React.Dispatch<React.SetStateAction<number[]>>;
}

const Companies: FC<ICompanies> = ({
  companies,
  checkedCompanies,
  setCheckedCompanies,
}) => {
  const [dataForm, setDataForm] = useState<{ name: string; address: string }>({
    name: "",
    address: "",
  });

  const { addCompany } = useActions();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataForm.name && dataForm.address) {
      addCompany({ name: dataForm.name, address: dataForm.address });
      setDataForm({
        name: "",
        address: "",
      });
    }
  };

  return (
    <>
      <h1 className={s.title}>Компании</h1>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => submitForm(e)}
        className={s.form}
      >
        <input
          value={dataForm.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDataForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Название компании"
          type="text"
        />
        <input
          value={dataForm.address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDataForm((prev) => ({ ...prev, address: e.target.value }))
          }
          placeholder="Адрес"
          type="text"
        />
        <button type="submit">Добавить</button>
      </form>
      <TableCompanies
        checkedCompanies={checkedCompanies}
        setCheckedCompanies={setCheckedCompanies}
        companies={companies}
      />
    </>
  );
};

export default Companies;
Companies;
