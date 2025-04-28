#!/usr/bin/env node
import fs from "fs";
import child_process from "child_process";

const files = fs
  .readdirSync("./personal-patches")
  .filter((f) => f.endsWith(".diff"));
files.forEach((file) => {
  console.log(`Applying patch ${file}`);
  const { stderr, stdout, status } = child_process.spawnSync(
    `git`,
    ["apply", `./personal-patches/${file}`],
    {
      cwd: process.cwd(),
      stdio: "inherit",
    }
  );

  if (status !== 0) {
    process.exit(1);
  }
});
