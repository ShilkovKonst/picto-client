export const findTag = (tags, tagToFind) => ({
  isFounded: tags?.some((t) => t.title == tagToFind),
  tag: tags?.find((t) => t.title == tagToFind)?.id,
});
