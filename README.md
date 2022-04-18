# Task Manager

This is a task management project what focuses primarily on personal task management and productivity.

Demo link: https://mytaskplan.me/

API: https://github.com/MaurerKrisztian/TaskManager-api

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_TaskManager&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_TaskManager&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_TaskManager&metric=bugs)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_TaskManager&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_TaskManager&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_TaskManager&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_TaskManager&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_TaskManager)






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
