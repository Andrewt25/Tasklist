import { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import {
  documentGetInitialProps,
  DocumentHeadTags,
  DocumentHeadTagsProps,
} from "@mui/material-nextjs/v14-pagesRouter";
import { JSX } from "react";

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};

export default function MyDocument(
  props: JSX.IntrinsicAttributes & DocumentHeadTagsProps
) {
  return (
    <Html lang="en">
      <DocumentHeadTags {...props} />
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
