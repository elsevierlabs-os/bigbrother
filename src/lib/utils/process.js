export const getEnvFlag = (flag) => process && process.env && process.env[flag];
export const exitProcess = (status = 0) => process && process.exit && process.exit(status);
export const getProcessCWD = () => process && process.cwd && process.cwd();
