import { gql } from "@apollo/client";

export const ALL_EMPLOYEES = gql`
  query AllEmployees($jobTitle: String, $department: String, $level: Int) {
    allEmployees(jobTitle: $jobTitle, department: $department, level: $level) {
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
  query AllEmployees($id: ID) {
    allEmployees(id: $id) {
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
      firstName: $firstName
      lastName: $lastName
      job: $job
      city: $city
      country: $country
      base: $base
      variable: $variable
      bonus: $bonus
      benefits: $benefits
      equity: $equity
    ) {
      firstName
    }
  }
`;

export const CREATE_JOB = gql`
  mutation AddJob($job: String!, $department: String!, $level: Int!) {
    addJob(job: $job, department: $department, level: $level) {
      title
    }
  }
`;

export const CREATE_LOCATION = gql`
  mutation AddLocation($city: String!, $country: String!) {
    addLocation(city: $city, country: $country) {
      city
      country
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation AddDepartment($title: String!) {
    addDepartment(title: $title) {
      title
    }
  }
`;

export const CHANGE_ROLE = gql`
  mutation ChangeRole($jobId: Int!, $id: Int!) {
    changeRole(jobId: $jobId, id: $id) {
      job {
        title
      }
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: FileInput!, $empId: Int!) {
    uploadImage(file: $file, empId: $empId)
  }
`;

export const LOGIN = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $email: String!) {
    login(firstName: $firstName, lastName: $lastName, email: $email) {
      token
      id
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
