export function randomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  if (length > characters.length) {
    throw new Error("Length exceeds available unique characters");
  }

  const shuffled = characters
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
  return shuffled.substring(0, length);
}
