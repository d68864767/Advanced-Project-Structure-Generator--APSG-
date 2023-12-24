# Contributing to Advanced Project Structure Generator (APSG)

First off, thank you for considering contributing to APSG. It's people like you that make APSG such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/yourusername/apsg/issues) page to see if someone else in the community has already created a ticket. If not, go ahead and make one!

## Fork & create a branch

If this is something you think you can fix, then fork APSG and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```bash
git checkout -b feature/325-add-jshint
```

## Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first.

## Get the code

The first thing you need to do is clone our repository:

```bash
git clone https://github.com/yourusername/apsg.git
```

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with APSG's master branch:

```bash
git remote add upstream https://github.com/yourusername/apsg.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```bash
git checkout feature/325-add-jshint
git rebase master
git push --set-upstream origin feature/325-add-jshint
```

Finally, go to GitHub and [make a Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) :D

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) [resources](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) but here's the suggested workflow:

```bash
git checkout feature/325-add-jshint
git pull --rebase upstream master
git push --force-with-lease origin feature/325-add-jshint
```

## Code review

A team member will review your pull request and provide feedback. Please be patient, as review times can vary. Once approved, your pull request will be merged into the master branch.

## That's it! 

Again, thank you for your contribution. APSG wouldn't be what it is without you.
