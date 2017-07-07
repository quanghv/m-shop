import constant from "./constant";

export const consoleLog = (str1, str2) => {
  if (constant.DEBUG) console.log(str1, str2);
};
