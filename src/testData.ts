export interface ICompany {
  id: number;
  name: string;
  employees: IEmployee[];
  address: string;
}

export interface IEmployee {
  id: number;
  surname: string;
  name: string;
  post: string;
}

export const companies: ICompany[] = [
  {
    id: 1,
    name: "Рога и копыта",
    employees: [
      {
        id: 1,
        surname: "Иванов",
        name: "Иван",
        post: "Водитель",
      },
      {
        id: 2,
        surname: "Сергеев",
        name: "Сергей",
        post: "Оператор",
      },
      {
        id: 3,
        surname: "Самойлова",
        name: "Светлана",
        post: "Директор",
      },
    ],
    address: "Москва",
  },
  {
    id: 2,
    name: "Турнамент",
    employees: [
      {
        id: 1,
        surname: "Макеев",
        name: "Дмитрий",
        post: "Менеджер",
      },
      {
        id: 2,
        surname: "Петров",
        name: "Святослав",
        post: "Водитель",
      },
      {
        id: 3,
        surname: "Мусаев",
        name: "Сервер",
        post: "Директор",
      },
      {
        id: 4,
        surname: "Леган",
        name: "Максим",
        post: "Владелец",
      },
    ],
    address: "Санкт-Петербург",
  },
  {
    id: 3,
    name: "ЦСК",
    employees: [
      {
        id: 1,
        surname: "Макеев",
        name: "Дмитрий",
        post: "Менеджер",
      },
      {
        id: 2,
        surname: "Петров",
        name: "Святослав",
        post: "Водитель",
      },
      {
        id: 3,
        surname: "Мусаев",
        name: "Сервер",
        post: "Директор",
      },
      {
        id: 4,
        surname: "Леган",
        name: "Максим",
        post: "Владелец",
      },
      {
        id: 5,
        surname: "Смолов",
        name: "Егор",
        post: "Продавец",
      },
    ],
    address: "Саки",
  },
];
