export const getNestedValue = (
  obj,
  path,
) => {
  return path.reduce(
    (current, key) => current?.[key],
    obj,
  );
};