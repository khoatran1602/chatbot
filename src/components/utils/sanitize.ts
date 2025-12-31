/**
 * Simple XSS-safe markdown sanitizer.
 * Escapes dangerous HTML while preserving markdown formatting.
 */

// Allowed markdown patterns
const MARKDOWN_PATTERNS = {
  bold: /\*\*(.*?)\*\*/g,
  italic: /\*(.*?)\*/g,
  code: /`(.*?)`/g,
  codeBlock: /```[\s\S]*?```/g,
  link: /\[([^\]]+)\]\(([^)]+)\)/g,
  heading: /^(#{1,6})\s+(.+)$/gm,
  listItem: /^[-*]\s+(.+)$/gm,
  numberedList: /^(\d+)\.\s+(.+)$/gm,
};

/**
 * Escape HTML entities to prevent XSS.
 */
export function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

/**
 * Sanitize markdown content for safe rendering.
 * Escapes HTML but preserves safe markdown formatting.
 */
export function sanitizeMarkdown(text: string): string {
  if (!text) return '';
  
  // First, escape all HTML
  let sanitized = escapeHtml(text);
  
  // Convert markdown to safe HTML
  // Bold
  sanitized = sanitized.replace(MARKDOWN_PATTERNS.bold, '<strong>$1</strong>');
  
  // Italic
  sanitized = sanitized.replace(MARKDOWN_PATTERNS.italic, '<em>$1</em>');
  
  // Inline code
  sanitized = sanitized.replace(MARKDOWN_PATTERNS.code, '<code>$1</code>');
  
  // Headings
  sanitized = sanitized.replace(MARKDOWN_PATTERNS.heading, (_, hashes, content) => {
    const level = hashes.length;
    return `<h${level}>${content}</h${level}>`;
  });
  
  // List items
  sanitized = sanitized.replace(MARKDOWN_PATTERNS.listItem, '<li>$1</li>');
  
  // Numbered list items
  sanitized = sanitized.replace(MARKDOWN_PATTERNS.numberedList, '<li>$2</li>');
  
  // Line breaks
  sanitized = sanitized.replace(/\n\n/g, '</p><p>');
  sanitized = sanitized.replace(/\n/g, '<br/>');
  
  // Wrap in paragraph
  if (!sanitized.startsWith('<')) {
    sanitized = `<p>${sanitized}</p>`;
  }
  
  return sanitized;
}

/**
 * Render sanitized markdown as React-safe HTML.
 * Use with dangerouslySetInnerHTML after sanitization.
 */
export function createSafeHtml(text: string): { __html: string } {
  return { __html: sanitizeMarkdown(text) };
}
