import { GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

declare const process: {
  env: { NEXT_PUBLIC_GQL_PATH: string };
};

const endpoint: string = process.env.NEXT_PUBLIC_GQL_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { distance, serialNumber } = req.query as {
    distance: string;
    serialNumber: string;
  };

  if (distance && serialNumber) {
    const graphQLClient = new GraphQLClient(endpoint, { mode: "cors" });

    await graphQLClient.request(
      `mutation {
        updateContainers(
          where: { serialNumber: "${serialNumber}" }
          update: { distance: ${parseInt(distance)} }
        ) {	
          containers {
            id
            name
            distance
          }
        }
      }`
    );
  }

  res.status(200).end(`Water level is: ${distance}`);
}
