export const name = "luna-bot";
export const script = "src/index.ts";
export const interpreter = "bun";
export const env = {
  // eslint-disable-next-line no-undef
  PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
};