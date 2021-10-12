import config from "./config";
import downloadGit from 'download-git-repo';

export const downloadLocal = async (projectName) => {
    return new Promise((resolve, reject) => {
        //projectName 为下载到的本地目录
        downloadGit(config.repository, projectName, {clone: true}, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}