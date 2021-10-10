import apiVersion from "../version";
import { mockMessage } from "../../../__mocks__/MockMessage";

describe("Commands / General / version", () => {
  test("Correct bot message", async () => {
    const msg = mockMessage();
    await apiVersion.execute({ msg });
    expect(msg.channel.lastMessage.content).toBe(
      `I'm the OJK Bot version **${process.env.npm_package_version}**`
    );
  });
});
