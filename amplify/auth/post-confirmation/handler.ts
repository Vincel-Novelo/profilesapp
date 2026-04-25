import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { type Schema } from "../../data/resource";
import { generateClient } from "aws-amplify/data";
import { createTodo } from "./graphql/mutations";

const client = generateClient<Schema>({
  authMode: "iam",
});

export const handler: PostConfirmationTriggerHandler = async (event) => {
  await client.graphql({
    query: createTodo,
    variables: {
      input: {
        content: event.request.userAttributes.email ?? "",
      },
    },
  });

  return event;
};