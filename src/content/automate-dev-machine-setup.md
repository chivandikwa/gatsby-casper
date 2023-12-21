---
layout: post
title: Automating developer machine setup
image: img/unsplash/charlesdeluvio-pjAH2Ax4uWk-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T09:00:00.000Z
tags: [Developer Machine Setup Automation, Efficient Software Developer Machine Configuration, Developer Productivity Enhancement]
draft: false
excerpt: Say goodbye to manual developer machine configuration hassles and discover a more efficient way to set up your developer environment with Chocolatey, and a simple JavaScript script.
---

Photo by <a href="https://unsplash.com/@charlesdeluvio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">charlesdeluvio</a> on <a href="https://unsplash.com/photos/pjAH2Ax4uWk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Optimizing new developer machine setup

This article will outline how I tackled an inefficiency around the setting up of a new developer machine whenever someone new joins the team or someone gets a new machine. The existing process at the time was based on some text-based instructions that someone would have to follow manually, downloading applications and clicking through prompts, customizing tooling configuration, setting up tooling plugins, and manually verifying that all was set up well. This process had many flaws

- On updating the instructions it was difficult to verify that the update was correct and fits in with the rest of the steps
- The process was tedious and error-prone. It was easy to forget a step or struggle with out-to-date instructions or screenshots based on updates to tooling from the time the instructions were written.
- The process took time. While focusing on other onboarding processing and actioning the setup in between a new developer typically required a whole week to complete the setup.

As an engineering team we could do better and what we needed was to automate the process, but how? To best determine that we needed the criteria for automation and this was the requirement

- The automation should run within a time constraint of an hour considering an average internet connection for downloading required applications and SDKs
- Existing tooling should be leveraged. For example SDKs like node, dotnet, etc. ship with CLI tooling that could be utilized. I would further explore automation tools for setting up applications like Ansible, Chef, Chocolatey, etc.
- After machine setup, verification should be run to ensure that the setup was a success.
- The process should largely be customizable, giving developers flexibility over the tooling they use and how it is configured
- The setup should ideally have one entry point. A requirement to run multiple commands while better would still be counter to the goals

From this, I further looked at what the automation details would be. Here are some examples of things a team may want to tackle:

- Installing required tooling like SDKs, IDEs, etc
- Pulling down the base repository on the correct branch
- Installing code dependencies via tools like npm and NuGet
- Configuring git settings like autocrlf to team standard
- Setting up customized docker containers like Redis
- Validating required tool version specifics like .net, node, npm
- Validating the setup via executing certain steps in your repository, like restoring dependencies, linting, running tests, creating builds, etc.
- Running custom migrations like database migrations with DbUp or Entity Framework
- Verifying that all required tooling has been installed

After thorough research, given my use case, I settled for the following:

- Leverage Chocolatey for installing required software and plugins with a script that a developer can customize
- Leverage SDKs in use for further setups and verifications like dotnet and npm commands
- To ensure a single entry point while utilizing various tooling, a simple JavaScript script would be leveraged to orchestrate everything. Other scripting options like Powershell would have been viable, but JavaScript was specifically chosen as the skills to maintain this already existed in the team.

Here is an example chocolatey script `setup-packages.config`

```xml
<?xml version="1.0" encoding="utf-8"?>

<packages>

  <!-- mandatory -->

  <package id="nodejs" version="18.8.0" />

  <package id="dotnet-6.0-sdk" />

  <package id="netfx-4.8-devpack" />

  <package id="vscode" />

  <package id="vscode-eslint" />

  <package id="vscode-codespellchecker" />

  <package id="visualstudio2022enterprise" />

  <package id="visualstudio2022-workload-netweb" />

  <package id="nswagstudio" />

  <package id="docker-desktop" />

  <package id="sql-server-2019" />

  <package id="sql-server-management-studio" />

  <package id="git" />

  <package id="lens" />

  <package id="kubernetes-helm" />

  <package id="kubernetes-cli" />

  <package id="awscli" />

  <package id="eksctl" />

  <package id="terraform" />

  <package id="putty" />


  <!-- Optional, can substitute with own tools of choice -->

  <package id="gitextensions" />


  <package id="vscode-vsliveshare" />

  <package id="vscode-gitlens" />

  <package id="vscode-csharp" />


  <package id="googlechrome" />

  <package id="lastpass-chrome" />

  <package id="postman" />

  <package id="chocolateygui" />

  <package id="powertoys" />

  <package id="7zip" />

  <package id="paint.net" />

  <package id="microsoft-windows-terminal" />

  <package id="oh-my-posh" />

  <package id="obsidian" />


  <package id="devtoys" />

  <package id="pulumi" />

  <package id="mremoteng" />

</packages>
```

Here is an example implementation of an orchestration script `setup.js`

```javascript
import { spawnSync } from 'child_process';

import {
  MessageLevel,
  colorMessage,
  versionValidators,
  executeCommand,
  executeInteractiveCommand,
  indent,
} from './setup-module.mjs';

import process from 'process';

import { rename, copyFile, existsSync } from 'fs';

import packagesJson from './package.json';

const engines = packagesJson.engines;

console.log(colorMessage(MessageLevel.Warning, '\n⚠ prerequisites:'));

console.log(
  colorMessage(
    MessageLevel.Info,

    'Chocolatey should be installed on this machine for this process to complete successfully',
  ),
);

console.log(colorMessage(MessageLevel.Info, 'The docker daemon should be running'));

spawnSync('pause', { stdio: 'inherit', shell: true });

console.log(colorMessage(MessageLevel.Info, '▶️ Starting repository verification\n\n'));

executeCommand('git --version', 'Verifying if Git is installed');

console.log(colorMessage(MessageLevel.Info, '▶️ Updating repository'));

executeCommand('git checkout develop', 'Fetching latest changes');

executeCommand('git pull', 'Checking out develop branch');

console.log(colorMessage(MessageLevel.Info, '▶️ Configuring Git'));

executeInteractiveCommand('git config --global core.autocrlf true', 'Set core.autocrlf=true');

console.log(
  colorMessage(
    MessageLevel.Info,

    '▶️ Installing applications with chocolatey with no prompts. Check results.txt for status.',
  ),
);

executeCommand('choco install setup-packages.config > result.txt -y', 'Trigger chocolatey');

console.log(colorMessage(MessageLevel.Info, '▶️ Verifying installations'));

executeCommand(
  "choco feature enable --name='useEnhancedExitCodes' -y",

  "Enable chocolatey feature '' to get enhanced exit codes",
);

executeCommand('dotnet --version', 'Verifying if dotnet is installed');

executeInteractiveCommand('nswag --versions', 'Verifying if NSwag Studio is installed');

executeCommand('code --version', 'Verifying if Visual Studio Code is installed');

executeCommand(
  'choco find visualstudio2022enterprise -r -l',

  'Verifying if Visual Studio 2022 Enterprise is installed',
);

executeCommand(
  'choco find visualstudio2022-workload-netweb -r -l',

  'Verifying if ASP.NET and web development workload for Visual Studio 2022 is installed',
);

executeCommand(
  'choco find sql-server-2019 -r -l',

  'Verifying if Microsoft SQL Server 2019 Developer Edition is installed',
);

executeCommand(
  'choco find sql-server-management-studio -r -l',

  'Verifying if Microsoft SQL Server Management Studio is installed',
);

executeCommand(
  'choco find docker-desktop -r -l',

  'Verifying if Docker Desktop is installed',

  'https://www.docker.com/products/docker-desktop/',
);

console.log(colorMessage(MessageLevel.Info, '▶️  Setting up Custom Redis container'));

executeCommand('docker run --name dev-redis -p 6379:6379 -d redis', 'Creating Redis container');

console.log(colorMessage(MessageLevel.Info, '▶️  Validating tooling versions'));

const versionValidationErrors = Object.keys(engines)

  .map(function (engine) {
    if (!versionValidators[engine]) {
      throw new Error(`Engine '${engine}' is unsupported.`);
    }

    return versionValidators[engine](engines[engine]);
  })

  .filter(Boolean);

if (versionValidationErrors.length) {
  console.error(
    colorMessage(
      MessageLevel.Danger,
      '🚨 There were errors validating the compatibility of this computer:',
    ),
  );

  console.error(`\n${indent}${versionValidationErrors.join('\n    ')} \n\n`);

  process.exit(1);
}

console.log(colorMessage(MessageLevel.Info, '▶️ Verifying .NET Solution'));

executeCommand('dotnet restore Sample.sln --force', 'Restoring .net dependencies');

executeCommand('dotnet build Sample.sln --no-restore', 'Building .net solution');

executeCommand('dotnet test Sample.sln  --no-build --no-restore', 'Running .net tests');

console.log(colorMessage(MessageLevel.Info, '▶️ Updating database with DbUP'));

process.chdir('Sample.DbUpgrader');

executeCommand('dotnet run', 'Executing DB Upgrader');

console.log(colorMessage(MessageLevel.Info, '▶️ Verifying Node Application'));

process.chdir('../Sample');

console.log(colorMessage(MessageLevel.Info, '▶️ Setting up Node Application developer .env file'));

if (existsSync('.env')) {
  console.log(
    colorMessage(
      MessageLevel.Subtitle,
      `${indent}Creating back up of existing .env file '.env.old'`,
    ),
  );

  rename('.env', '.env.old', err => {
    if (err) throw err;

    process.exit(1);
  });
}

console.log(colorMessage(MessageLevel.Subtitle, `${indent}Creating new .env file from seed`));

copyFile('.env.seed', '.env', err => {
  if (err) throw err;

  process.exit(1);
});

executeCommand('npm install', 'Installing Node Application dependencies');

executeCommand('npm run test', 'Running Node Application tests');

executeCommand('npm run lint', 'Running Node Application linting');

executeCommand('npm run build', 'Creating production Node Application build');

console.log(colorMessage(MessageLevel.Success, `✅  Verification completed successfully`));
```

Supporting `setup-module.js`

```javascript
import { spawnSync, execSync } from 'child_process';

import process from 'process';

import semver from 'semver';

const versionErrorMessage = (name, actual, desired, url) =>
  `This computer has ${name} ${actual} installed, but ${desired} is required ${url}`;

export const indent = '    ';

export const MessageLevel = {
  Success: 'success',

  Danger: 'danger',

  Info: 'info',

  Subtitle: 'subtitle',
};

const ColoredMessage = {
  [MessageLevel.Success]: { open: '\u001b[32;1m', close: '\u001b[0m' },

  [MessageLevel.Warning]: { open: '\u001b[33;1m', close: '\u001b[0m' },

  [MessageLevel.Danger]: { open: '\u001b[31;1m', close: '\u001b[0m' },

  [MessageLevel.Info]: { open: '\u001b[36;1m', close: '\u001b[0m' },

  [MessageLevel.Subtitle]: { open: '\u001b[2;1m', close: '\u001b[0m' },
};

const validateVersion = (desired, command, name, url) => {
  console.log(colorMessage(MessageLevel.Info, `${indent}▶️ Validating ${name}`));

  let actual;

  try {
    actual = execSync(command).toString().trim();
  } catch (error) {
    return `There was an error running the command '${command}':\n ${error.message}`;
  }

  const valid = semver.satisfies(actual, desired);

  if (valid)
    console.log(
      colorMessage(MessageLevel.Success, `${indent}✅  Success: Validating ${name} \n\n`),
    );

  return valid ? null : versionErrorMessage(actual, desired, name, url);
};

export const colorMessage = (modifier, message) => {
  return `${ColoredMessage[modifier].open} ${message} ${ColoredMessage[modifier].close}`;
};

export const versionValidators = {
  dotnet: function (desired) {
    return validateVersion(
      desired,
      'dotnet --version',
      'dotnet',
      'https://dotnet.microsoft.com/en-us/download',
    );
  },

  dotnet_format: function (desired) {
    return validateVersion(
      desired,
      ' dotnet format --version',
      'dotnet format',
      `Please update npm by running 'dotnet tool install -g dotnet-format --version "${desired}.*"`,
    );
  },

  node: function (desired) {
    return validateVersion(desired, 'node --version', 'node', 'https://nodejs.org');
  },

  npm: function (desired) {
    return validateVersion(
      desired,
      'npm --version',
      'npm',
      `Please update npm by running 'npm install --global npm@${desired}`,
    );
  },
};

export const executeCommand = (command, title, url = '', ignoreError = false) => {
  console.log(colorMessage(MessageLevel.Info, `${indent}▶️ ${title}`));

  const result = spawnSync(command, { stdio: 'inherit', shell: true });

  if (result.status !== 0 && !ignoreError) {
    console.error(colorMessage(MessageLevel.Danger, `${indent}🚨 Failure: ${title} ${url} \n\n`));
    process.exit(result.status);
  }

  console.log(colorMessage(MessageLevel.Success, `${indent}✅  Success: ${title} \n\n`));
};

export const executeInteractiveCommand = (command, title, url = '') => {
  console.log(colorMessage(MessageLevel.Info, `${indent}▶️ ${title}`));

  const result = spawnSync(command, { shell: true }).stderr.toString().trim();

  if (result) {
    console.error(colorMessage(MessageLevel.Danger, `${indent}🚨 Failure: ${title} ${url} \n\n`));
    process.exit(result.status);
  }

  console.log(colorMessage(MessageLevel.Success, `${indent}✅ Success: ${title} \n\n`));
};
```

`package.json` for indicating setup dependencies and setting dependency version requirements via the `engines` with semantic versioning support.

```json
{
  "name": "Setup",
  "description": "",
  "repository": "",
  "private": true,
  "type": "module",
  "engines": {
    "dotnet": ">=6",
    "dotnet_format": ">=6",
    "node": "18.8.0",
    "npm": "7.0.0"
  },
  "dependencies": {
    "semver": "7.1.3"
  }
}
```

This can be triggered with the command `npm install; node --experimental-json-modules setup`

This implementation met all the requirements criteria and in summary, was a success due to the following:

- Process runs in just under an hour
- On update, this can be retested by spinning up a clean virtual machine and triggering the whole process
- Process is highly configurable, particularly the chocolatey configuration
- Verification can be run on demand to ensure that a developer machine meets requirements, particularly around things like SDK versions
- One would no longer have to wait weeks/months before using a certain tool or command to realize their machine is not correctly set up and lose hours trying to diagnose this. Verifications are now done on demand.
