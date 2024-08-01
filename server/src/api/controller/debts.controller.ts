import { createEndpoint } from "../../utilities/createEndpoint";
import { debtsServices } from "../services/debts.service";

const getAllDebts = createEndpoint()(async (_, res) => {
  const data = await debtsServices.getAllDebts();

  return res.json({
    status: 200,
    debts: data,
  });
});

export const debtsController = {
  getAllDebts,
};
