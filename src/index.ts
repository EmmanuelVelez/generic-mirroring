import simpleGit, { SimpleGit } from 'simple-git';
import * as del from 'del';
let git: SimpleGit = simpleGit();
interface RepoArgs {
    source: string;
    mirror: string;
    remoteName: string;
}
export default class GenericHandler {
  protected readonly gitService: SimpleGit;
  public constructor() {
    this.gitService = simpleGit();
  }
  async setupMirror(
    sourceRepoUrl: string, //format example -> https://${USER}:${PASS|TOKEN}@${REPO}
    mirrorRepoUrl: string, //format example -> https://${USER}:${PASS|TOKEN}@${REPO}
    remoteName: string,
    workdir?: string
  ) {
    try {
      const repoName = `${this.getRepoName(sourceRepoUrl)}${workdir || ''}`;
      await del.default(repoName);
      await git.clone(sourceRepoUrl, repoName, ['--mirror']);
      git = simpleGit(repoName);
      await git.fetch('origin');
      await git.addRemote(remoteName, mirrorRepoUrl);
      await git.push([remoteName, '--all']); //pushing all branches
    } catch (e) {
      console.log('error', e);
    }
  }

  getRepoName(repoUrl: string) {
    const urlParts = repoUrl.split('/');
    const repoName = urlParts[urlParts.length - 1];
    return repoName.indexOf('.git') == -1 ? `${repoName}.git` : repoName;
  }
}

const handler = new GenericHandler();
const repositoriesToMirror: Array<RepoArgs> = [
  
];
const promises = repositoriesToMirror.map((repo, index) =>
  handler.setupMirror(
    repo.source,
    repo.mirror,
    repo.remoteName,
    index.toString()
  )
);
Promise.all(promises).then((r) => console.log(r));
