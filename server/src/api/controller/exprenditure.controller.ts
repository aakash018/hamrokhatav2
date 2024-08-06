import { createEndpoint } from "../../utilities/createEndpoint";
import {
  createCustomExpenditureSchema,
  createExprenditureSchema,
} from "../validation-schema/create-exprenditure";
import { expenditureServices } from "../services/exprenditure.service";

const createExprenditure = createEndpoint({
  body: createExprenditureSchema,
})(async (req, res) => {
  await expenditureServices.createExprenditure(req.body);

  res.json({
    status: 200,
    message: "created",
  });
});

const createCustomeExprenditure = createEndpoint({
  body: createCustomExpenditureSchema,
})(async (req, res) => {
  await expenditureServices.createCustomeExpenditure(req.body);

  res.json({
    status: 200,
    message: "created",
  });
});

const getAllExprenditure = createEndpoint()(async (req, res) => {
  const { timeFrame } = req.query;
  console.log(timeFrame);
  const data = await expenditureServices.getExprenditureData(timeFrame);

  res.json({
    status: 200,
    message: "created",
    expenditure: data,
  });
});

export const expenditureController = {
  createExprenditure,
  getAllExprenditure,
  createCustomeExprenditure,
};
