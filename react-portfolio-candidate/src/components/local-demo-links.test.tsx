import { renderToString } from "react-dom/server";
import { LocalDemoLinks } from "@/components/local-demo-links";
import demos from "@/data/local-demos.json";

it("never emits loopback demo links in server-rendered public pages", () => {
  for (const slug of Object.keys(demos)) {
    expect(renderToString(<LocalDemoLinks slug={slug} />)).toBe("");
  }
});

it("maps exactly the nine prepared projects to their isolated local origins", () => {
  expect(Object.keys(demos)).toHaveLength(9);
  for (const links of Object.values(demos)) {
    for (const link of links) {
      const url = new URL(link.url);
      expect(url.hostname).toBe("127.0.0.1");
      expect(url.username).toBe("");
      expect(url.password).toBe("");
    }
  }
});
