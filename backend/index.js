const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v4: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const { connectToDatabase } = require("./util/db");
const { Sequelize } = require("sequelize");
const {
  Department,
  Employee,
  Job,
  Location,
  PayBand,
  Salary,
} = require("./models");
const { putImage } = require("./util/image");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./util/config");

const typeDefs = `

    input FileInput {
      mimetype: String!
      data: String!
    }

    type Department{
        title: String!
        id: ID!
    }

    type Job{
        title: String!
        department: Department!
        level: Int!
        id: ID!
    }

    type Location{
        city: String!
        country: String!
        id: ID!  
    }

    type Salary{
        base: Int!
        variable: Int
        bonus: Int
        equity: Int
        benefits: Int    
    }

    type Employee{
        firstName: String!
        lastName: String!
        job: Job!
        location: Location!
        salary: Salary!
        payband: PayBand
        id: ID!
        image: String
        admin: Boolean
    }

    type PayBand{
      department: Department!
      job: Job!
      employees: [Employee!]!
      id: ID!
    }

    type Token {
      token: String!
      id: Int!
    }

    type Query{
        employeeCount: Int!
        allEmployees(
            firstName: String
            lastName: String
            jobTitle: String
            locationCity: String
            locationCountry: String
            department: String
            level: Int
            id: ID
        ): [Employee!]!
        allPayBands(
            jobTitle: String
            department: String
            level: Int
          ): [PayBand!]!
        maxEmployeeBaseSalary: Int!
        allJobs: [Job!]!
        allLocations: [Location!]!
        getLoggedInUser: Employee!
    }

    type Mutation{
      addEmployee(
        firstName: String!
        lastName: String!
        job: String!
        city: String!
        country: String!
        base: Int!
        variable: Int
        bonus: Int
        benefits: Int
        equity: Int
      ): Employee!
      addJob(
        job: String!
        department: String!
        level: Int!
      ): Job!
      addDepartment(
        title: String!
      ): Department!
      addLocation(
        city: String!
        country: String!  
      ): Location!
      changeRole(
        id: Int!
        jobId: Int! 
      ): Employee!
      uploadImage(
        file: FileInput! 
        empId: Int! 
      ): String!
      login(
        firstName: String!
        lastName: String!
        email: String!
      ): Token
    }
`;

const resolvers = {
  Query: {
    employeeCount: async () => Employee.count(),
    allEmployees: async (root, args) => {
      let where = [{}, {}, {}, {}];

      if (args.firstName) {
        where[0] = { ...where[0], firstName: args.firstName };
      }
      if (args.lastName) {
        where[0] = { ...where[0], lastName: args.lastName };
      }
      if (args.jobTitle) {
        where[1] = { ...where[1], title: args.jobTitle };
      }
      if (args.locationCity) {
        where[2] = { ...where[2], city: args.locationCity };
      }
      if (args.locationCountry) {
        where[2] = { ...where[2], country: args.locationCountry };
      }
      if (args.department) {
        where[3] = { ...where[3], title: args.department };
      }
      if (args.level) {
        where[1] = { ...where[1], level: args.level };
      }
      if (args.id) {
        where[0] = { ...where[0], id: args.id };
      }

      const employees = await Employee.findAll({
        include: [
          {
            model: Job,
            where: where[1],
            include: {
              model: Department,
              where: where[3],
            },
          },
          {
            model: Location,
            where: where[2],
          },
          {
            model: PayBand,
            include: [
              {
                model: Employee,
                include: { model: Salary },
              },
              {
                model: Job,
              },
              {
                model: Department,
              },
            ],
          },
          {
            model: Salary,
          },
        ],
        where: where[0],
        order: [
          ["firstName", "ASC"],
          ["lastName", "ASC"],
        ],
      });

      console.log(employees);

      return employees;
    },
    allPayBands: (root, args) => {
      let where = [{}, {}];
      if (args.jobTitle) {
        where[0] = { ...where[0], title: args.jobTitle };
      }
      if (args.department) {
        where[1] = { ...where[1], title: args.department };
      }
      if (args.level) {
        where[0] = { ...where[0], level: args.level };
      }

      return PayBand.findAll({
        include: [
          { model: Job, where: where[0] },
          { model: Department, where: where[1] },
          { model: Employee, include: { model: Salary } },
        ],
        order: [
          [Sequelize.literal(`"department"."title"`), "ASC"],
          [Sequelize.literal(`"job"."level"`), "ASC"],
          [Sequelize.literal(`"job"."title"`), "ASC"],
        ],
      });
    },
    allJobs: async () => {
      const jobs = await Job.findAll({
        include: { model: Department },
        order: [["title", "ASC"]],
      });
      console.log(jobs);
      return jobs;
    },
    allLocations: async () => {
      const locations = await Location.findAll();
      return locations;
    },
    maxEmployeeBaseSalary: async () => {
      const result = await Employee.findOne({
        attributes: [
          [Sequelize.fn("MAX", Sequelize.col("salary.base")), "maxBaseSalary"],
        ],
        include: [
          {
            model: Salary,
            attributes: [],
          },
        ],
        raw: true,
      });

      return result.maxBaseSalary;
    },
    getLoggedInUser: async (root, args, context) => {
      console.log(context);
      return context.currentUser;
    },
  },

  Mutation: {
    addEmployee: async (root, args) => {
      const job = await Job.findOne({
        where: {
          title: args.job,
        },
        include: {
          model: Department,
        },
      });

      if (!job) {
        throw new GraphQLError("Job does not exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.job,
          },
        });
      }

      const location = await Location.findOne({
        where: {
          city: args.city,
          country: args.country,
        },
      });

      console.log("Here");

      if (!location) {
        throw new GraphQLError("Location not found", {
          extention: {
            code: "BAD_USER_INPUT",
            invalidArgs: [args.city, args.country],
          },
        });
      }

      const salary = await Salary.create({
        base: args.base,
        variable: args.variable || 0,
        bonus: args.bonus || 0,
        benefits: args.benefits || 0,
        equity: args.equity || 0,
      });

      const payBand = await PayBand.findOne({
        include: {
          model: Job,
          where: {
            title: job.dataValues.title,
          },
        },
      });

      const employee = await Employee.create({
        firstName: args.firstName,
        lastName: args.lastName,
        jobId: job.dataValues.id,
        locationId: location.dataValues.id,
        salaryId: salary.dataValues.id,
        payBandId: payBand.dataValues.id,
      });

      return employee;
    },
    addJob: async (root, args) => {
      const job = await Job.findOne({
        where: {
          title: args.job,
        },
        include: {
          model: Department,
        },
      });

      if (job) {
        throw new GraphQLError("Job already exists", {
          extention: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.job,
          },
        });
      }

      const department = await Department.findOne({
        where: {
          title: args.department,
        },
      });

      if (!department) {
        throw new GraphQLError("Department not found", {
          extention: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.department,
          },
        });
      }

      const newJob = await Job.create(
        {
          title: args.job,
          level: args.level,
          departmentId: department.dataValues.id,
        },
        { include: { model: Department } }
      );

      await PayBand.create({
        jobId: newJob.dataValues.id,
        jobFunctionId: department.dataValues.id,
      });

      return newJob;
    },
    addDepartment: async (root, args) => {
      const department = await Department.create({
        title: args.title,
      });

      return department;
    },
    addLocation: async (root, args) => {
      const location = await Location.create({
        ...args,
      });

      return location;
    },
    changeRole: async (root, args) => {
      try {
        const employee = await Employee.findByPk(args.id, {
          include: { model: Job },
        });
        employee.jobId = args.jobId;
        const payband = await PayBand.findOne({ where: { jobId: args.jobId } });
        employee.payBandId = payband.id;
        await employee.save();
        return employee;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    uploadImage: async (root, args) => {
      const { mimetype, data } = args.file;
      const filename = uuid() + "_photo.jpg";
      const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const imageLink = await putImage(buffer, filename, mimetype);
      const employee = await Employee.findByPk(args.empId);
      employee.image = imageLink;
      await employee.save();
      return filename;
    },
    login: async (root, args) => {
      try {
        const user = await Employee.findOne({
          where: {
            ...args,
          },
        });

        if (!user)
          throw new GraphQLError("User Not Found", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });

        const userForToken = {
          id: user.dataValues.id,
          firstName: user.dataValues.firstName,
          lastName: user.dataValues.lastName,
        };

        return { token: jwt.sign(userForToken, SECRET), id: user.id };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  const result = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), SECRET);
        const currentUser = await Employee.findByPk(decodedToken.id, {
          include: [
            {
              model: Job,

              include: {
                model: Department,
              },
            },
            {
              model: Location,
            },
            {
              model: PayBand,
              include: [
                {
                  model: Employee,
                  include: { model: Salary },
                },
                {
                  model: Job,
                },
                {
                  model: Department,
                },
              ],
            },
            {
              model: Salary,
            },
          ],
        });
        return { currentUser };
      }
    },
  });

  await connectToDatabase();

  console.log(`Server ready at ${result.url}`);
};

main();
