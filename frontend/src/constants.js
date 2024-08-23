export const sideBarLinks = [
  {
    id: 2,
    value: "People",
    href: "/people",
    admin: true,
    icon: "Users",
  },
  {
    id: 1,
    value: "Pay Bands",
    href: "/paybands",
    admin: true,
    icon: "HandCoins",
  },
  {
    id: 3,
    value: "Total Rewards",
    href: "/",
    admin: false,
    icon: "Shovel",
  },
];

export const payBandsHeaders = [
  {
    id: 1,
    title: "Job Function",
    key: "department",
  },
  {
    id: 2,
    title: "Job Title",
    key: "job",
  },
  {
    id: 3,
    title: "Level",
    key: "level",
  },
];

export const peopleHeaders = [
  {
    id: 1,
    title: "Job Function",
    key: "department",
  },
  {
    id: 2,
    title: "Job Title",
    key: "job",
  },
  {
    id: 3,
    title: "Level",
    key: "level",
  },
];

export const addButtonOptions = [
  {
    id: 0,
    value: "Employee",
  },
  {
    id: 1,
    value: "Job",
  },
  {
    id: 2,
    value: "Department",
  },
  {
    id: 3,
    value: "Location",
  },
];

import { z } from "zod";
import {
  CREATE_DEPARTMENT,
  CREATE_EMPLOYEE,
  CREATE_JOB,
  CREATE_LOCATION,
} from "./queries";

export const typesOfAddForms = {
  Employee: {
    fields: [
      { name: "First Name", value: "Input", key: "firstName" },
      { name: "Last Name", value: "Input", key: "lastName" },
      { name: "Base Salary", value: "Input", key: "base" },
      { name: "Variable Salary", value: "Input", key: "variable" },
      { name: "Bonus", value: "Input", key: "bonus" },
      { name: "Benefits", value: "Input", key: "benefits" },
      { name: "Equity", value: "Input", key: "equity" },
      { name: "Job Title", value: "Select", key: "job" },
      { name: "City", value: "Select", key: "city" },
      { name: "Country", value: "Select", key: "country" },
    ],
    submitFunc: (data) => {
      return {
        ...data,
        base: Number(data.base),
        variable: Number(data.variable),
        bonus: Number(data.bonus),
        benefits: Number(data.benefits),
        equity: Number(data.equity),
      };
    },
    query: CREATE_EMPLOYEE,
    formSchema: z.object({
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
      base: z.string().min(0),
      variable: z.string().optional().default("0"),
      bonus: z.string().optional().default("0"),
      equity: z.string().optional().default("0"),
      benefits: z.string().optional().default("0"),
      job: z.string().min(2).max(50),
      city: z.string().min(2).max(50),
      country: z.string().min(2).max(50),
    }),
  },
  Job: {
    fields: [
      { name: "Job Title", value: "Input", key: "title" },
      { name: "Department", value: "Select", key: "department" },
    ],
    submitFunc: (data) => ({ ...data }),
    query: CREATE_JOB,
    formSchema: z.object({
      title: z.string().min(2).max(50),
      department: z.string().min(2).max(50),
    }),
  },
  Department: {
    fields: [{ name: "Department Title", value: "Input", key: "title" }],
    submitFunc: (data) => ({ ...data }),
    query: CREATE_DEPARTMENT,
    formSchema: z.object({
      title: z.string().min(2).max(50),
    }),
  },
  Location: {
    fields: [
      { name: "City", value: "Input", key: "city" },
      { name: "Country", value: "Input", key: "country" },
    ],
    submitFunc: (data) => ({ ...data }),
    query: CREATE_LOCATION,
    formSchema: z.object({
      city: z.string().min(2).max(50),
      country: z.string().min(2).max(50),
    }),
  },
};
