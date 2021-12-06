module.exports = {
  swagger: {
    definition: {
      info: {
        title: "Blue Badge API with Swagger",
        version: "0.1.0",
        description: "Documentation for this Blue Badge project API.",
      },
    },
    apis: ["./controllers/dashboard/index.js"],
  },
};
