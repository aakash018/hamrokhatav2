import { db } from "../../db/db";
import { members } from "../../db/schema";

const findALlMembers = async () => {
  return await db.select().from(members);
};

export const membersServices = {
  findALlMembers,
};
