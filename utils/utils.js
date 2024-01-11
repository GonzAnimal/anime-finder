export const RenderHTMLStr = ({ htmlString }) => {
  return (
    <p
      className="text-slate-400 hover:text-slate-200 text-sm"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

export const modifyDomNode = (node) => {
  switch (node.type) {
    case "tag":
      switch (node.name) {
        case "h2":
          node.attribs = {
            ...node.attribs,
            class: "antialiased text-slate-400 hover:text-slate-200 text-sm",
          };
          break;
        case "p":
          node.attribs = {
            ...node.attribs,
            class:
              "pb-[1.5rem] antialiased text-slate-400 hover:text-slate-200 text-sm",
          };
          break;
        case "strong":
          node.attribs = {
            ...node.attribs,
            class: "inline-block antialiased text-semibold mr-2 mb-2",
          };
          break;
        case "span":
          node.attribs = {
            ...node.attribs,
            class: "antialiased inline-block",
          };
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return node;
};

export const slugOptions = {
  lower: true,
  locale: "en",
  strict: true,
  trim: true,
};
