import fs from "fs";
import util from "util";
import logger from "../logs/logger";
import ApiError from "./ApiError";

const rename = util.promisify(fs.rename);

export default async function moveFiles(oldPath: string, newPath: string) {
  try {
    const t = await rename(oldPath, newPath);
    console.log(t);
  } catch (error) {
    console.log(error);
    throw new ApiError("error renaming image", 500);
  }
}
