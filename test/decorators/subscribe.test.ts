import { expect } from "chai";
import { type, field, subscribe, createSchema } from "../../src";
import TestServer from "../TestServer";

/**
 * Apollo server subcription example: https://github.com/apollographql/docs-examples/blob/main/apollo-server/v3/subscriptions/index.js#L34-L38
 * Grphql.js subscription resolver example: https://github.com/howtographql/graphql-js/blob/master/src/resolvers/Subscription.js
 **/

describe("Test @subscribe", () => {
  it.only("should export a field on the type", async () => {
    @type
    class SubscriptionQuery {
      @field(String)
      @subscribe(() => 'async iterator')
      numberIncremented;
    }

    const server = new TestServer(createSchema(SubscriptionQuery));
    const { body } = await server.query({
      query: `
        {
          numberIncremented
        }
      `
    });
    expect(body).to.deep.equal({
      data: {
        numberIncremented: null,
      }
    });
  });
});
