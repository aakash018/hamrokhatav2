import { createEndpoint } from "../../utilities/createEndpoint";

import { personalPaymentsServices } from "../services/personalPayments.service";
import { personalPaymentFormSchema } from "../validation-schema/create-personalPayment";

const createPersonalPayment = createEndpoint({
  body: personalPaymentFormSchema,
})(async (req, res) => {
  await personalPaymentsServices.create(req.body);

  return res.json({
    status: 200,
    message: "payment made",
  });
});

export const personalPaymentController = {
  createPersonalPayment,
};
