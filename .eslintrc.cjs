// .eslintrc.cjs
module.exports = {
  // use the built-in Create-React-App rules
  extends: ["react-app", "react-app/jest"],
  rules: {
    // any overrides you want, for example:
    "no-console": "warn",
    "react-hooks/exhaustive-deps": "error",
  },
};
