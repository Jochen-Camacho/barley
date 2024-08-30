import { gql } from "@apollo/client";

export const ALL_EMPLOYEES = gql`
  query AllEmployees($job: String, $department: String, $level: [Int]) {
    employee(
      where: {
        _and: [
          { job: { title: { _regex: $job } } }
          { job: { department: { title: { _regex: $department } } } }
          { job: { level: { _in: $level } } }
        ]
      }
    ) {
      firstName
      lastName
      job {
        department {
          title
        }
        level
        title
      }
      location {
        city
        country
      }
      salary {
        base
      }
      id
      image
    }
  }
`;

export const ALL_META = gql`
  query AllJobs {
    job {
      title
      department {
        title
      }
      level
      id
    }
    location {
      city
      country
    }
    department {
      id
      title
    }
  }
`;

export const ALL_PAY_BANDS = gql`
  query AllPayBands($job: String, $department: String, $level: [Int]) {
    payband(
      where: {
        _and: [
          { job: { title: { _regex: $job } } }
          { job: { department: { title: { _regex: $department } } } }
          { job: { level: { _in: $level } } }
        ]
      }
    ) {
      employees {
        firstName
        lastName
        salary {
          base
          benefits
          bonus
          equity
          variable
        }
        image
      }
      job {
        title
        level
      }
      department {
        title
      }
    }
    maxEmployeeBaseSalary {
      salary
    }
  }
`;

export const FIND_EMPLOYEE = gql`
  query AllEmployees($id: Int!) {
    employee_by_pk(id: $id) {
      firstName
      id
      job {
        department {
          title
        }
        title
        level
      }
      lastName
      location {
        city
        country
      }
      salary {
        base
        variable
        bonus
        benefits
        equity
      }
      image
      payband {
        employees {
          salary {
            base
          }
        }
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation AddEmployee(
    $firstName: String!
    $lastName: String!
    $email: String!
    $jobId: Int!
    $city: String!
    $country: String!
    $base: Int!
    $variable: Int!
    $bonus: Int!
    $benefits: Int!
    $equity: Int!
  ) {
    addEmployee(
      createEmployeeInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        jobId: $jobId
        city: $city
        country: $country
        base: $base
        variable: $variable
        bonus: $bonus
        benefits: $benefits
        equity: $equity
      }
    ) {
      firstName
    }
  }
`;

export const CREATE_JOB = gql`
  mutation AddJob($title: String!, $department: Int!, $level: Int!) {
    insert_payband_one(
      object: {
        departmentId: $department
        job: {
          data: { departmentId: $department, title: $title, level: $level }
        }
      }
    ) {
      job {
        id
      }
    }
  }
`;

export const CREATE_LOCATION = gql`
  mutation AddLocation($city: String!, $country: String!) {
    insert_location_one(object: { city: $city, country: $country }) {
      city
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation AddDepartment($title: String!) {
    insert_department_one(object: { title: $title }) {
      id
    }
  }
`;

export const CHANGE_ROLE = gql`
  mutation ChangeRole($jobId: Int!, $id: Int!) {
    changeRole(changeRoleInput: { id: $id, jobId: $jobId }) {
      output
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($data: String!, $mimetype: String!, $empId: Int!) {
    uploadImage(
      fileUploadInput: { data: $data, mimetype: $mimetype, id: $empId }
    ) {
      image
    }
  }
`;

export const LOGIN = gql`
  mutation Login($firstName: String!, $lastName: String!, $email: String!) {
    login(
      loginInput: { email: $email, firstName: $firstName, lastName: $lastName }
    ) {
      token
    }
  }
`;

export const GET_LOGGED_IN_USER_ID = gql`
  query GetLoggedInUserId {
    getLoggedInUserId {
      id
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser($id: Int!) {
    employee_by_pk(id: $id) {
      firstName
      id
      image
      job {
        title
        department {
          title
        }
        level
      }
      lastName
      location {
        city
        country
      }
      payband {
        employees {
          salary {
            base
          }
        }
      }
      salary {
        base
        bonus
        benefits
        equity
        variable
      }
      admin
    }
  }
`;
