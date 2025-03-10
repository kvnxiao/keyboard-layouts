import { renderKeyboardLayouts } from "@/renderKeyboardLayouts";
import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { StrictMode } from "react";

const app = new Hono();

app.get(
  "*",
  reactRenderer(({ children }) => (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Keyboard Layout Visualization</title>
      </head>
      <body>{children}</body>
    </html>
  )),
);

app.get("/", async (c) => {
  const layouts = await renderKeyboardLayouts();
  return c.render(
    <StrictMode>
      {layouts.map((layout) =>
        layout.svgLayers.map((svgLayer) => (
          <div
            key={layout.fileName}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Satori generates an SVG string
            dangerouslySetInnerHTML={{ __html: svgLayer }}
          />
        )),
      )}
    </StrictMode>,
  );
});

export default app;
