import { gql } from "@apollo/client";

export const ALL_EMPLOYEES = gql`
  query AllEmployees($job: String, $department: String, $level: Int) {
    allEmployees(
      allEmployeeArgs: { department: $department, job: $job, level: $level }
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
    allJobs {
      title
      department {
        title
      }
      level
      id
    }
    allLocations {
      city
      country
    }
    allDepartments {
      title
    }
  }
`;

export const ALL_PAY_BANDS = gql`
  query AllPayBands {
    allPayBands {
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
    maxEmployeeBaseSalary
  }
`;

export const FIND_EMPLOYEE = gql`
  query AllEmployees($id: Int) {
    allEmployees(allEmployeeArgs: { id: $id }) {
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
    $job: String!
    $city: String!
    $country: String!
    $base: Int!
    $variable: Int
    $bonus: Int
    $benefits: Int
    $equity: Int
  ) {
    addEmployee(
      createEmployeeInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        job: $job
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
  mutation AddJob($title: String!, $department: String!, $level: Int!) {
    addJob(
      createJobInput: { title: $title, department: $department, level: $level }
    ) {
      title
    }
  }
`;

export const CREATE_LOCATION = gql`
  mutation AddLocation($city: String!, $country: String!) {
    addLocation(createLocationInput: { city: $city, country: $country }) {
      city
      country
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation AddDepartment($title: String!) {
    addDepartment(createDepartmentInput: { title: $title }) {
      title
    }
  }
`;

export const CHANGE_ROLE = gql`
  mutation ChangeRole($jobId: Int!, $id: Int!) {
    changeRole(changeRoleInput: { jobId: $jobId, id: $id }) {
      job {
        title
      }
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
  mutation {
    login(
      loginInput: {
        firstName: "John"
        lastName: "Doe"
        email: "johndoe@gmail.com"
      }
    ) {
      token
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    getLoggedInUser {
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
