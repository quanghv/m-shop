import constant from "./constant";

export const consoleLog = (str1, str2) => {
  if (constant.DEBUG) {
    if (str2) console.log(str1, str2);
    else console.log(str1);
  }
};
