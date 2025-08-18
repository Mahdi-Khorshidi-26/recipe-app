export function Paragraph({ text }: { text: string }) {
  return <p className="text-base leading-relaxed text-gray-700">{text}</p>;
}

export function ParagraphWithHighlight({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <p className="text-base leading-relaxed text-gray-700">
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
}
