/**
 * Converts simple markdown-style formatting to HTML
 * Supports **bold** and *italic* syntax
 *
 * @param text - Text with **bold** or *italic* markers
 * @returns HTML string with <strong> and <em> tags
 *
 * @example
 * formatText("The **tetrahedron** represents *fire*")
 * // Returns: "The <strong>tetrahedron</strong> represents <em>fire</em>"
 */
export function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}
