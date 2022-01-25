const { Octokit } = require('@octokit/core');

const octokit = new Octokit({
  auth: `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`,
});

async function getAllPulls() {
  let pulls = await octokit.request('GET /repos/rust-lang/rust/pulls?page=2');
  console.log(pulls);
  return pulls;
}

async function getAllMergedPulls() {
  let pulls = await octokit.request('GET /repos/rust-lang/rust/pulls');
  pulls = pulls.data.filter((p) => p.merged_at === null);
  console.log(pulls.length);
  return pulls;
}

async function getMergedPull() {
  let pull = await octokit.request('GET /repos/rust-lang/rust/pulls/93269');
  console.log(pull.data.merged);
  return pull;
}

getAllPulls();
