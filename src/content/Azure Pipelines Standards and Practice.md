---
layout: post
title: Azure Pipelines Standards and Practices
image: img/clean/used/llama.jpg
author: [Thulani S. Chivandikwa]
date: 2023-02-19T00:00:00.000Z
tags: [azure, pipelines, ci/cd]
draft: false
excerpt: Azure pipelines standards and practices
---

# Azure Pipelines Standards and Practices

✅ **DO** create pipelines in YAML committed in the relevant project repository and not via the classic UI approach or CLI.

✅ **DO** add shared variables to a variable group to avoid duplicated variables across various pipelines.

> Add only truly global variables, that is any for which you would require the same value for all pipelines that use this without the need to customize for a single pipeline. An API key to a third-party service or a license key is a good example.

✅ **DO** leverage integrations to services like `Azure Key Vault` for managing user secrets and using those in pipeline runs.

✅ **DO** favour parameters over variables for scenarios where you have a finite list of values as parameters will make use of a radio button group or dropdown for convenience.

✅ **DO** store `secret` variables with `Keep this value as secret` enabled. The default would be for Azure DevOps to store variables as raw text.

✅ **DO** maintain an extensive retention policy for pipeline runs. This is important to track run history over an extensive period for example to see if test run performance is regressing, linting cleanups are on track, and the addition of tests in the solution is healthy.

✅ **DO** have a clear naming convention for your pipelines, making it easy to identify the type of pipeline (CI or CD), the target environment, and the project being built.

Here's an example of an Azure Pipelines naming standard:

  - Build pipelines: build-{projectName}
  - Release pipelines: release-{projectName}-{environmentName}
  - Deployment pipelines: deploy-{projectName}-{environmentName}
  - Infrastructure pipelines: infra-{infrastructureType}-{projectName}-{environmentName}

Here's a breakdown of each component of the naming standard:

  - {projectName}: the name of the project being built, deployed, or tested.
  - {environmentName}: the name of the environment being deployed or released to.
  - {infrastructureType}: the type of infrastructure being deployed or managed, such as aks for Azure   Kubernetes Service or appsvc for Azure App Service.
  {testType}: the type of test being run, such as unit, integration, or end-to-end.
  - {platform}: the platform being tested on, such as linux-x64 or windows-x64.

By following a consistent naming standard like this, it's easier to quickly identify and locate the   pipelines you need within Azure DevOps.

✅ **DO** use templates to share pipeline configuration across projects. This ensures consistency in pipeline design and makes it easier to maintain pipelines.

✅ **DO** implement checks such as quality gates, code coverage requirements, and security scans as part of the pipeline.

✅ **DO** have a clear and concise description of what the pipeline is doing and include any relevant links to documentation or related systems.

✅ **DO** have a clear and concise description of what the pipeline is doing and include any relevant links to documentation or related systems.

✅ **DO** split long-running jobs across multiple stages. This promotes visibility and enables progress reporting as each stage is completed.

✅ **DO** make use of the appropriate pool directive for agents to help reduce build times by ensuring the build does not wait for an agent to become available.

✅ **DO** split long-running jobs across multiple stages. This promotes visibility and enables progress reporting as each stage is completed.

✅ **DO** ensure that your deployment scripts are idempotent, i.e., running the script multiple times should not produce unexpected/different results.

✅ **DO** make use of the appropriate pool directive for agents to help reduce build times by ensuring the build does not wait for an agent to become available.

> ℹ️ Microsoft frequently updates these images with the latest available tooling, bugfixes and patches. You can also specify a specific version for reproducibility reasons, especially when you want to maintain compatibility with certain libraries or frameworks.

✅ **DO** have separate pipelines for CI and CD. This separation makes it easy to change the deployment strategy without affecting the build process.

✅ **DO** ensure you have monitoring and alerting in place for your pipelines, so you can be notified when something goes wrong.

> ℹ️ A healthy build and deployment process is only as good as the monitoring and alerting in place. Ensure that you have appropriate notifications and reporting in place so that you can quickly identify and remediate any issues that arise

⛔ **DO NOT** use pipeline variables to store sensitive data such as secrets, keys, or passwords. Instead, use Azure Key Vault or similar secure storage service.

⛔ **DO NOT** create overly complex pipelines with unnecessary steps or dependencies. This can lead to longer build times and an increased risk of failure. Keep pipelines simple and focused on the task at hand.

⛔ **DO NOT** use scripts or code snippets in your pipeline without proper testing and validation. This can introduce security vulnerabilities or errors that are difficult to diagnose

## Examples

Here is a single pipeline example that accounts for most of the recommendations in this document with comments

```yml
# Build pipeline for a .NET Core project
# Uses a pool of Microsoft-hosted agents
# Stores secrets in Azure Key Vault
# Includes linting, unit testing, code coverage, and security scanning checks
# Uses templates for pipeline configuration
# Has a clear description of what the pipeline is doing and relevant links
# Splits long-running jobs across multiple stages
# Uses the appropriate agent pool to reduce build times
# Has a separate pipeline for CI and CD
# Has monitoring and alerting in place for the pipeline

trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  solution: '**/*.sln'
  buildPlatform: 'Any CPU'
  buildConfiguration: 'Release'

stages:
- stage: Build
  displayName: 'Build stage'
  jobs:
  - job: Build
    displayName: 'Build job'
    steps:
    - template: templates/dotnet-core-build.yml
      parameters:
        solution: ${{ variables.solution }}
        buildPlatform: ${{ variables.buildPlatform }}
        buildConfiguration: ${{ variables.buildConfiguration }}
    - script: echo Build completed $(Build.BuildId)
      displayName: 'Finish Build'
    # The linting check step
    - template: templates/eslint-check.yml
      parameters:
        workingDirectory: '$(Build.SourcesDirectory)'

- stage: Test
  displayName: 'Test stage'
  jobs:
  - job: Test
    displayName: 'Test job'
    steps:
    - template: templates/dotnet-core-test.yml
      parameters:
        solution: ${{ variables.solution }}
        buildPlatform: ${{ variables.buildPlatform }}
        buildConfiguration: ${{ variables.buildConfiguration }}
    - script: echo Test completed $(Build.BuildId)
      displayName: 'Finish Test'

- stage: Publish
  displayName: 'Publish stage'
  jobs:
  - job: Publish
    displayName: 'Publish job'
    steps:
    - template: templates/dotnet-core-publish.yml
      parameters:
        solution: ${{ variables.solution }}
        buildPlatform: ${{ variables.buildPlatform }}
        buildConfiguration: ${{ variables.buildConfiguration }}
    - script: echo Publish completed $(Build.BuildId)
      displayName: 'Finish Publish'

# Variables that should be shared across pipelines can be stored in variable groups
# Secrets should be stored in Azure Key Vault or a similar secure storage service
variables:
- group: MyVariableGroup

# Templates can be used to share pipeline configuration across projects
# In this example, we have separate templates for .NET Core builds, tests, and publish
# These templates can be reused across different projects with minor modifications
templates:
- template: templates/dotnet-core-build.yml
- template: templates/dotnet-core-test.yml
- template: templates/dotnet-core-publish.yml

# Use a clear and concise description of what the pipeline is doing
# Include relevant links to documentation or related systems
# This will help team members understand what the pipeline does and how it works
# It also provides a starting point for troubleshooting if issues arise
# The example below includes links to the project's wiki, issue tracker, and documentation
resources:
  repositories:
  - repository: self
    triggers:
    - main
    - development
  - repository: git://github.com/MyOrganization/my-project.wiki.git
    name: wiki
  - repository: git://github.com/MyOrganization/my-project/issues.git
    name: issues
  - repository: git://github.com/MyOrganization/my-project/docs.git
    name: docs

# Specify an appropriate agent pool to reduce
```
