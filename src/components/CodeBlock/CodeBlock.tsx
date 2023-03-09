import { CodeBlockProps } from "../types";

function CodeBlock(props: CodeBlockProps) {
  const { code } = props;

  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
}

export default CodeBlock;
