import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import { H1, H2, H3, H4, P, UL, OL, Li, Blockquote, InlineCode, Hyperlink } from "@/components/shared/common/typography";
import Separator from "@/components/shared/common/separator";
import Image from "next/image";

type MDXComponentProps = {
  [key: string]: React.ReactNode | string | number | boolean | object;
  children?: React.ReactNode;
};

type ImageProps = {
  src?: string;
  alt?: string;
  [key: string]: React.ReactNode | string | number | boolean | object;
};

type LinkProps = {
  href?: string;
  [key: string]: React.ReactNode | string | number | boolean | object;
};

export default function MDXContent({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) {
  return (
    <div className="mdx-content">
      <MDXRemote
        {...mdxSource}
        components={{
          h1: (props: MDXComponentProps) => <H1 {...props} />,
          h2: (props: MDXComponentProps) => <H2 {...props} />,
          h3: (props: MDXComponentProps) => <H3 {...props} />,
          h4: (props: MDXComponentProps) => <H4 {...props} />,
          p: (props: MDXComponentProps) => <P {...props} />,
          ul: (props: MDXComponentProps) => <UL {...props} />,
          ol: (props: MDXComponentProps) => <OL {...props} />,
          li: (props: MDXComponentProps) => <Li {...props} />,
          hr: () => <Separator className="my-8" />,
          a: (props: LinkProps) => <Hyperlink href={props.href} {...props} />,
          blockquote: (props: MDXComponentProps) => <Blockquote {...props} />,
          code: (props: MDXComponentProps) => <InlineCode {...props} />,
          img: (props: ImageProps) => (
            <Image
              src={props.src || ""}
              alt={props.alt || ""}
              width={1200}
              height={600}
              className="rounded-sm my-6"
            />
          )
        }}
      />
    </div>
  );
}