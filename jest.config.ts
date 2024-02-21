// jest.config.ts
export default {
  // extensions:
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // "^@/(.*)": "<rootDir>/src/components/(.*)",
    // "^@/components(.*)$": "<rootDir>/src/components$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
