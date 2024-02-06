export const boldifyText = (searchText: string, inputText: string): string => {
  if (!searchText || !inputText) {
    return inputText;
  }

  const regex = new RegExp(
    `(${searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return inputText.replace(regex, "<b>$1</b>");
};
