# Task Manager

This is a task management project what focuses primarily on personal task management and productivity.

Demo link: https://mytaskplan.me/

API: https://github.com/MaurerKrisztian/TaskManager-api

## Features

Users
- Task
  - Properties: title, description, start at (remaining time), label,  attachment files
  - Actions: crate, delete, edit, start - end, dtag and drop to board
- Board:
  - Contains tasks
  - Drag and drop tasks
  - Properties: name
  - Actions: crate, delete, edit, sort
- Email:
  - Daily task email subscription:
    - Every day sends an email about the tasks for the day

## CI-CD

The main branch is automatically deploys to my linode server (https://mytaskplan.me/). The linode server configuration can be found here:  https://github.com/MaurerKrisztian/linode_configuration


## Contribution

If you have any feature idea feel free to open an issue or create a pull request.
