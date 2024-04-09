# Roy!

Bit of a weird repo this one! For the time being, have some usage instuctions:

1. Visit [vincent](https://vincent-van-git.netlify.app/) - draw a picture and export it
2. Take the config file you've downloaded and convert the "commits" to being a single long string of numbers between 0-9
3. Update the name, email address and painting string at the top of create-repo.mjs
4. Run create-repo.mjs - it'll create a `/tmp/fast-import.txt` file
5. Create a new folder, `git init` in it
6. Run `git fast-import < /tmp/fast-import.txt`
7. Create a new git repo, then push your new git repo to it!
8. GitHub CI will kick off and (hopefully) draw your picture as a series of commits using git fast-import
9. Every Sunday at 1am it'll run, move back to your first commit in the repo, redraw the picture from the new start date and then commit it, overwriting the history

