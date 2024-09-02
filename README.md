# Barley Project

## Introduction

This project aims to replicate some of products provided by [Barley](https://www.barley.io/), specifically the Paybands, People and Total Rewards products with my added intuition. 
The project consists of a Vite + React frontend and 3 backend versions using different approaches, which are: 
- Vanilla GraphQL Node API
- Nest.js GraphQL API
- Hasura + Nest.js GraphQL API (deployed)

Deployed Link: https://barley-liard.vercel.app/

## Features

### People

Following the Barley People's page format it has a the list of each employee in the company with filter options for job functions, title and level. Moreover, it also includes the ability to add employees, 
jobs, departments or locations. 

<img src="https://github.com/user-attachments/assets/a9858fa6-235c-48df-a457-e083b37c2a18" width="600px"  />

### Add Form
<img src="https://github.com/user-attachments/assets/936b9070-26f1-435f-bac2-25bf47c5cb93" width="600px"  />

### Employee Profile

Each employee had a designated employee profile which showed some of their information and also had the ability to change the employee's role and thus changing their payband.
<img src="https://github.com/user-attachments/assets/5c890122-5dd2-43fd-92c9-58287d982e85" width="600px"  />


### Paybands
Following the a similar format of the People page, the Paybands has filters for the different job function, title and levels of paybands. As well as a 
visualization of the employees in this payband and their respective salary.

<img src="https://github.com/user-attachments/assets/2ffaca27-aff8-4cbd-ba4a-c99ead00a354" width="600px"  />

Note: Only Total Rewards is accessible for non admin users. 

### Total Rewards
The Total rewards provides a salary breakdown, perks and benefits for the current logged in user.
<img src="https://github.com/user-attachments/assets/3c39bc9f-4c91-4383-883f-aa64a57c3cf7" width="600px"  />


## Project Breakdown

### Vanilla GraphQL Node API

This vanilla project uses a postgres container with Apollo Server to create the GraphQL API. It uses Sequelize to create Models of the data and handles authorization with 
the jsonwebtoken library.

### Nest.js GraphQL API

In the Nest.js version, I continued the using the postgres container but opted for the nest graphql and typeOrm modules to structure
our database schema and graphql API.

### Hasura + Nest.js GraphQL API

For the final version I wanted to incorporate both hasura and nest.js to fully match Barley's tech stack. I used docker to create a server, hasura and postgres container. 
The sever container consisted of a nest.js application which was used to carry out buisness logic using hasura actions. Hasura was out main endpoint for the frontend to request
data, connecting requests to either the nest.js appliction or the postgres database. Moreover, I also created a hasura project to persist the migrations and metadata made in 
development.

