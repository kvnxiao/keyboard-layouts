# layout-visualization

The layout visualization engine of this repository uses React in an SSR / Node script
context to generate `.svg` files of keyboard layouts.

Layouts are expected to be defined in the root `layouts` folder, and the layout
visualization engine simply parses all valid layout JSON files and outputs SVG files of
each layer into the same folder.

## Usage and development

[satori](https://github.com/vercel/satori) is an HTML-&-CSS-to-SVG conversion library
which allows us to directly export a keyboard's layout represented via simple, stateless
React components into individual SVG files.

For generating layout SVG files, run `pnpm build`, which will output `.svg` files into
the root `layouts` folder.

For developing the layout UI and individual components, a simple [hono](https://github.com/honojs/hono)
server is used to serve a React SSR development server via [Vite](https://vite.dev/).
The dev server will first prerender the SVG output for serving via satori, rather than
simply rendering the React components into HTML DOM elements. This ensures that the
visual output between the dev server and generated SVG files will be the same.
