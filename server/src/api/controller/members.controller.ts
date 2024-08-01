import { createEndpoint } from "../../utilities/createEndpoint";
import { membersServices } from "../services/members.services";

const getAllMembers = createEndpoint()(async (_, res) => {
  const members = await membersServices.findALlMembers();

  return res.json({
    status: 200,
    members,
  });
});

export const membersController = {
  getAllMembers,
};
