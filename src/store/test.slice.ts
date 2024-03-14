import { IEmployee, companies } from "./../testData";
import { createSlice } from "@reduxjs/toolkit";
import { ICompany } from "../testData";

interface IInitialState {
  companies: ICompany[];
}

const initialState: IInitialState = {
  companies: companies,
};

export const slice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    deleteCompany: (state, { payload }) => {
      state.companies = state.companies.filter(
        (company: ICompany) => company.id != payload
      );
    },
    deleteEmployee: (
      state,
      { payload }: { payload: { idCompany: number; idEmployee: number } }
    ) => {
      state.companies = state.companies.map((company: ICompany) => {
        if (company.id != payload.idCompany) {
          return company;
        } else {
          return {
            ...company,
            employees: company.employees.filter(
              (employee: IEmployee) => employee.id != payload.idEmployee
            ),
          };
        }
      });
    },
    addCompany: (
      state,
      { payload }: { payload: { name: string; address: string } }
    ) => {
      state.companies.push({
        id: state.companies.length + 1,
        name: payload.name,
        address: payload.address,
        employees: [],
      });
    },
    addEmployee: (
      state,
      {
        payload,
      }: {
        payload: {
          idCompany: number;
          name: string;
          surname: string;
          post: string;
        };
      }
    ) => {
      state.companies = state.companies.map((company: ICompany) => {
        if (company.id != payload.idCompany) {
          return company;
        } else {
          return {
            ...company,
            employees: [
              ...company.employees,
              {
                id: company.employees.length + 1,
                name: payload.name,
                surname: payload.surname,
                post: payload.post,
              },
            ],
          };
        }
      });
    },
    editCompany: (
      state,
      { payload }: { payload: { id: number; name: string; address: string } }
    ) => {
      state.companies = state.companies.map((company: ICompany) => {
        if (company.id != payload.id) {
          return company;
        } else {
          return {
            ...company,
            name: payload.name,
            address: payload.address,
          };
        }
      });
    },
    editEmployee: (
      state,
      {
        payload,
      }: {
        payload: {
          idCompany: number;
          idEmployee: number;
          name: string;
          surname: string;
          post: string;
        };
      }
    ) => {
      state.companies = state.companies.map((company: ICompany) => {
        if (company.id != payload.idCompany) {
          return company;
        } else {
          return {
            ...company,
            employees: company.employees.map((employee: IEmployee) => {
              if (employee.id != payload.idEmployee) {
                return employee;
              } else {
                return {
                  ...employee,
                  surname: payload.surname,
                  name: payload.name,
                  post: payload.post,
                };
              }
            }),
          };
        }
      });
    },
  },
});

export const { reducer } = slice;

export const { deleteCompany } = slice.actions;

export const { deleteEmployee } = slice.actions;

export const { addCompany } = slice.actions;

export const { addEmployee } = slice.actions;

export const { editCompany } = slice.actions;

export const { editEmployee } = slice.actions;
