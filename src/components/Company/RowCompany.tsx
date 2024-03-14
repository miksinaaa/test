import { ChangeEvent, FC, useEffect, useState } from "react";
import { ICompany } from "../../testData";
import { useActions } from "../../hooks/useActions";

interface IRowCompany {
  checkedCompanies: number[];
  company: ICompany;
  setCheckedCompanies: React.Dispatch<React.SetStateAction<number[]>>;
}

const RowCompany: FC<IRowCompany> = ({
  checkedCompanies,
  company,
  setCheckedCompanies,
}) => {
  const { deleteCompany } = useActions();

  const [status, setStatus] = useState<boolean>(false);
  const [data, setData] = useState<{ name: string; address: string }>({
    name: "",
    address: "",
  });

  useEffect(() => {
    setData({ name: company.name, address: company.address });
  }, []);

  const deleteOne = (id: number) => {
    deleteCompany(id);
    if (checkedCompanies.includes(id)) {
      setCheckedCompanies((prev) => prev.filter((p) => p != id));
    }
  };

  const { editCompany } = useActions();

  const editOne = () => {
    setStatus(!status);
    editCompany({ id: company.id, name: data.name, address: data.address });
  };

  const checkCompany = (id: number) => {
    setCheckedCompanies((prev: number[]) =>
      prev.includes(id)
        ? [...prev.filter((p: number) => p != id)]
        : [...prev, id]
    );
  };

  return (
    <tr
      style={
        checkedCompanies.includes(company.id)
          ? {
              background: "#d13b7b",
            }
          : {}
      }
    >
      <td>
        <input
          checked={checkedCompanies.includes(company.id) ? true : false}
          onChange={() => checkCompany(company.id)}
          type="checkbox"
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
        <input readOnly={true} value={company.employees.length} type="text" />
      </td>
      <td>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, address: e.target.value })
          }
          readOnly={!status}
          value={data.address}
          type="text"
        />
      </td>
      <td>
        <button onClick={() => deleteOne(company.id)}>
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

export default RowCompany;
