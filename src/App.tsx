import { useState } from "react";
import s from "./App.module.scss";
import { useCompanies } from "./hooks/useCompanies";
import { ICompany } from "./testData";
import Employee from "./components/Employee/Employees";
import Companies from "./components/Company/Companies";

// Комментарии - пример как сделать динамическую подгрузку данных, но для этого желательно сервер, на который будут делаться запросы для подгрузки. Не полностью прописал как делается, лишь общую концепцию.

const App = () => {
  const { companies /*hasMore, fetchMoreCompanies*/ } = useCompanies();

  const [checkedCompanies, setCheckedCompanies] = useState<number[]>([]);

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ==
  //       document.documentElement.offsetHeight &&
  //     hasMore
  //   ) {
  //     fetchMoreCompanies(); // Загружаем больше компаний
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasMore]); // Запускаем эффект при изменении флага hasMore

  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <Companies
          companies={companies}
          checkedCompanies={checkedCompanies}
          setCheckedCompanies={setCheckedCompanies}
        />
      </div>
      <div className={s.right}>
        {companies
          .filter((company: ICompany) => checkedCompanies.includes(company.id))
          .map((company: ICompany, idx: number) => (
            <Employee key={idx} company={company} />
          ))}
        {/* {hasMore && <p>Loading...</p>} */}
      </div>
    </div>
  );
};

export default App;
