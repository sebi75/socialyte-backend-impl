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
  verbose: true, //we want to see the tests being run
}

export default config
