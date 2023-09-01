const github = require('@actions/github');
const token = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(token);


async function run() {
  try {
    // Get inputs from the workflow
    const response = core.getInput('response');
    const repositoryId = core.getInput('repository-id');
    const categoryId = core.getInput('category-id');

    // Create a GitHub client
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);

    // Format the ChatGPT response as Markdown
    const formattedResponse = `**ChatGPT Response:**\n\n${response}`;

    // Create a new discussion in GitHub Discussions
    const discussion = await octokit.rest.issues.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      title: 'Discussion Title', // You can customize the title here
      body: formattedResponse,
      category_id: categoryId,
    });

    // Get the URL of the created discussion
    const discussionUrl = discussion.data.html_url;

    // Set the discussion URL as an output for the workflow
    core.setOutput('discussion-url', discussionUrl);

    console.log(`Discussion created: ${discussionUrl}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
