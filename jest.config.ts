import { Config } from "jest"
const ts_preset = require("ts-jest/jest-preset")

const config: Config = {
  collectCoverage: false, //we don't want to collect coverage in tests right now
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  displayName: "Socialyte API Server",
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx", "node"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  ...ts_preset,
  verbose: false, //option when we don't want to show console.logs in tests, when it is true it doesn't show them
}

export default config
