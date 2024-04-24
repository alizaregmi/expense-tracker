import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //Calculate Incomes
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}/income`);
    setIncomes(response.data.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });

    return totalIncome;
  };

  //Calculate Expenses
  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}/expense`, expense)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/expense`);
    setExpenses(response.data.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}/expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });

    return totalExpense;
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};