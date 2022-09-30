import { Config } from "jest"
const ts_preset = require("ts-jest/jest-preset")

const config: Config = {
  //collectCoverage: true,
  //collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  displayName: "Socialyte API Server",
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx", "node"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  ...ts_preset,
  //verbose: true,
}

export default config
