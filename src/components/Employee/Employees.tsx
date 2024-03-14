import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ICompany } from "../../testData";
import TableEmployees from "./TableEmployees";
import s from "../../App.module.scss";
import { useActions } from "../../hooks/useActions";

const Employees: FC<{ company: ICompany }> = ({ company }) => {
  const [dataForm, setDataForm] = useState<{
    name: string;
    post: string;
    surname: string;
  }>({
    surname: "",
    name: "",
    post: "",
  });

  const { addEmployee } = useActions();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataForm.surname && dataForm.name && dataForm.post) {
      addEmployee({
        idCompany: company.id,
        name: dataForm.name,
        surname: dataForm.surname,
        post: dataForm.post,
      });
      setDataForm({
        surname: "",
        name: "",
        post: "",
      });
    }
  };

  return (
    <>
      <h1 className={s.title}>Сотрудники ({company.name})</h1>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => submitForm(e)}
        className={s.form}
      >
        <input
          value={dataForm.surname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDataForm((prev) => ({ ...prev, surname: e.target.value }))
          }
          placeholder="Фамилия"
          type="text"
        />
        <input
          value={dataForm.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDataForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Имя"
          type="text"
        />
        <input
          value={dataForm.post}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDataForm((prev) => ({ ...prev, post: e.target.value }))
          }
          placeholder="Должность"
          type="text"
        />
        <button type="submit">Добавить</button>
      </form>
      <TableEmployees company={company} />
    </>
  );
};

export default Employees;
