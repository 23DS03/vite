import { spawn } from "node:child_process";
import { loadEnvFile } from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { createServer } from "vite";

try {
  loadEnvFile(".env");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const apiProcess = spawn(process.execPath, ["server.js"], {
  env: process.env,
  stdio: "inherit",
});

let viteServer;
let isStopping = false;

function stop(signal = "SIGTERM") {
  if (isStopping) return;
  isStopping = true;
  apiProcess.kill(signal);
  void viteServer?.close();
}

process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));

apiProcess.once("exit", (code, signal) => {
  if (isStopping) return;
  console.error(`Chat API exited unexpectedly (code ${code ?? "none"}, signal ${signal ?? "none"}).`);
  process.exitCode = 1;
  void viteServer?.close().finally(() => {
    isStopping = true;
  });
});

async function waitForApi() {
  const healthUrl = `http://127.0.0.1:${process.env.API_PORT || 3001}/api/health`;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (apiProcess.exitCode !== null) {
      throw new Error("Chat API stopped before it became ready.");
    }

    try {
      const response = await fetch(healthUrl, { signal: AbortSignal.timeout(500) });
      if (response.ok) return;
    } catch {
      await delay(250);
    }
  }

  throw new Error(`Chat API did not become ready at ${healthUrl}.`);
}

try {
  await waitForApi();
  viteServer = await createServer();
  await viteServer.listen();
  viteServer.printUrls();
} catch (error) {
  stop();
  console.error(error.message);
  process.exitCode = 1;
}
