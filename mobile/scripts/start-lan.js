const os = require("os");
const { spawn } = require("child_process");

const interfaces = os.networkInterfaces();
let ip = null;

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === "IPv4" && !iface.internal) {
      ip = iface.address;
      break;
    }
  }
  if (ip) break;
}

if (!ip) {
  console.error("Could not detect local IPv4 address.");
  process.exit(1);
}

console.log(`Using REACT_NATIVE_PACKAGER_HOSTNAME=${ip}`);

const child = spawn("bunx", ["expo", "start", "--lan"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, REACT_NATIVE_PACKAGER_HOSTNAME: ip },
});

child.on("error", (err) => {
  console.error("Failed to start expo:", err.message);
  process.exit(1);
});

child.on("exit", (code) => process.exit(code));
