const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
const access = promisify(fs.access);

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".apanGit");
    const commitsPath = path.join(repoPath, "commits");
    const commitDir = path.join(commitsPath, commitID);

    try {
        // Check if commit directory exists
        await access(commitDir, fs.constants.F_OK);

        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for (const file of files) {
            const sourcePath = path.join(commitDir, file);
            const destinationPath = path.join(parentDir, file);

            try {
                await copyFile(sourcePath, destinationPath);
            } catch (fileError) {
                console.error(`Error copying file ${file}:`, fileError);
            }
        }

        console.log(`Commit ${commitID} reverted successfully.`);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error(`Error: Commit ${commitID} does not exist.`);
        } else {
            console.error("Unable to revert:", err);
        }
    }
}

module.exports = { revertRepo };
