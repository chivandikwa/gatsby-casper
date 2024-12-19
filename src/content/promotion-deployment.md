---
layout: post
title: Promotion deployment strategy Azure pipelines
image: img/unsplash/anna-vi-h7-zoPdyxSk-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-12-28T00:00:00.000Z
tags: [azure, pipelines, deployment]
draft: false
excerpt: Promote your application through different environments using Azure pipelines
---

Photo by <a href="https://unsplash.com/@anna_vi_travel?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anna Vi</a> on <a href="https://unsplash.com/photos/person-driving-a-vehicle-in-the-middle-of-the-road-h7-zoPdyxSk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

# Promotion deployment strategy pipelines

Are you considering implementing deployment pipelines to multiple environments and unsure about how to structure this? You could have a pipeline per environment and take advantage of [templates](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops&pivots=templates-includes)) for reuse across the pipelines. You will however need to apply the right level of care to ensure that you deploy the right things across the environments. When QA signs off on a release for instance, are you sure you are deploying the right artifacts/branch as was in QA?

If you have to rebuild artifacts on promotion to another environment, then you may be doing it wrong as unless you go the extra mile, you cannot guarantee that building the same branch commit twice results in the same artifacts. What if the underlying agent has updated dependencies, what if you do not have version pinning in your application and new dependencies are pulled, what if...?

Leveraging static and idempotent artefacts like Docker may be a great option as you would have the same artifacts move across environments. Even with that though, if you have to run multiple pipelines, what if you accidentally choose the wrong version on promotion?

Would a single pipeline that progressively promotes to multiple environments be a potential answer? Much like how [Octopus Deploy](https://octopus.com/)) works.

![](img/clean/promotion/a.jpg)

Convinced? Then you are in the right place. Let's explore how Azure Pipelines can be used to implement deployment strategies based on environment promotion, using YAML configurations to manage workflows that traditionally relied on UI-based tools like Azure Deployments.

Environment promotion in CI/CD is the practice of moving software between multiple stages or environments, such as development, QA, UAT, and production. Each environment serves a different purpose and typically requires that certain criteria be met before software is promoted to the next stage. This strategy helps ensure that only well-tested and verified code makes its way to production.

Let's take a look at a sample pipeline that has all of this

```yml
trigger:
  batch: true
  branches:
    include:
      - develop
      - master
      - release/*
      - hotfix/*

# This will deploy the latest of the following branches if any changes are available
# If you have merges happening to multiple at the same time, this may not work best for you
schedules:
  - cron: "0 0 * * *"
    displayName: Daily Midnight Deployment to QA
    branches:
      include:
        - develop
        - release/*
        - hotfix/*

parameters:
  - name: ignoreSchedule
    # Allows for deploying when run on demand to QA
    # Default is to only deploy to QA nightly (when scheduled), this allows an override
    displayName: Ignore scheduling rules
    default: false
    type: boolean

stages:
  - stage: publishArtifactsA
    displayName: Publish Artifacts A
    dependsOn: []
    jobs:
      - job: publish
        displayName: Publish Artifacts A
        # Ideally pull build tasks from a template to reuse with verification pipelines
        # Custom tasks that do actual packaging can then be added
        # - template: [location]/[template].yml
        steps:
          - script: echo "Publish Artifacts A"

  - stage: publishArtifactsB
    displayName: Publish Artifacts B
    dependsOn: []
    jobs:
      - job: publish
        displayName: Publish Artifacts B
        # Ideally pull build tasks from a template to reuse with verification pipelines
        # Custom tasks that do actual packaging can then be added
        # - template: [location]/[template].yml
        steps:
          - script: echo "Publish Artifacts B"

  - stage: deployToDev
    displayName: Deploy to Dev 🟢
    dependsOn: [publishArtifactsA, publishArtifactsB]
    # Check if skipping deployment to Dev environment is false (i.e., deployment to Dev is required)
    jobs:
      # Ideally pull build tasks from a template to reuse with verification pipelines
      # Custom tasks that do actual packaging can then be added
      # - template: [location]/[template].yml
      - deployment: deploy_application
        displayName: Deploy Application
        environment: dev-env
        strategy:
          runOnce:
            deploy:
              steps:
                - script: echo "Deploy to Dev"

  - stage: deployToQa
    displayName: Deploy to QA 🟠
    dependsOn: [deployToDev]
    # Deploy if Dev succeeded or was skipped (fast deploy to QA on demand)
    # Deployment to QA only on a schedule or on demand run with parameter set to true
    condition: |
      or(
        eq(variables['Build.Reason'], 'Schedule'),
        eq('${{ parameters.ignoreSchedule }}', true)
      )
    jobs:
      # Ideally pull build tasks from a template to reuse with verification pipelines
      # Custom tasks that do actual packaging can then be added
      # - template: [location]/[template].yml
      - deployment: deploy_application
        displayName: Deploy Application
        environment: qa-env
        strategy:
          runOnce:
            deploy:
              steps:
                - script: echo "Deploy to QA"

  - stage: deployToUat
    displayName: Deploy to UAT 🟠
    dependsOn: [deployToQa]
    # UAT has an approval gate
    condition: |
      or(
        eq(variables['Build.Reason'], 'Schedule'),
        eq('${{ parameters.ignoreSchedule }}', true)
      )
    jobs:
      # Ideally pull build tasks from a template to reuse with verification pipelines
      # Custom tasks that do actual packaging can then be added
      # - template: [location]/[template].yml
      - deployment: deploy_application
        displayName: Deploy Application
        environment: uat-env
        strategy:
          runOnce:
            deploy:
              steps:
                - script: echo "Deploy to UAT"

  - stage: deployToProd
    displayName: Deploy to Prod 🔴
    dependsOn: [deployToUat]
    condition: |
      or(
        eq(variables['Build.Reason'], 'Schedule'),
        eq('${{ parameters.ignoreSchedule }}', true)
      )
    jobs:
      # Ideally pull build tasks from a template to reuse with verification pipelines
      # Custom tasks that do actual packaging can then be added
      # - template: [location]/[template].yml
      - deployment: deploy_application
        displayName: Deploy Application
        environment: prod-env
        strategy:
          runOnce:
            deploy:
              steps:
                - script: echo "Deploy to Prod"
```

Multiple stages are defined in the pipeline, each corresponding to a target function/environment. Each stage can specify dependencies on previous stages, ensuring that deployments follow the correct order. Here’s a brief outline:

This can additionally be used with branch protection on the environment. Recommendations:
- Loose approach for dev, no protection allowing any branch to be deployed, including ones that have not been integrated via Pull Requests
- Allow only `release/*`, `hotfix/*`, `master` and `develop` into QA
- Allow only `release/*` and `hotfix/*`, into UAT and Prod

![](img/clean/promotion/b.jpg)

This simple conditional logic in the sample supports complex deployment strategies and mimics the functionality of dedicated deployment tools like Octopus Deploy, which focuses heavily on promoting releases between environments. This is also used hand in hand with branch control on environments, ensuring that certain branches are not promoted past QA, for instance, a developer's feature branch.

In an ideal world, the promotion would strictly follow the steps from left to right. However in the real world, you will come across some scenarios where you may want to break the rules, for instance
- You may want to fast deploy to QA without waiting to develop
- You may be working on a hotfix with changes on DEV/QA dependencies like your database that are no longer compatible with Prod, in which case you may want to deploy straight to UAT
- You may have one of those tough days where you just need to get some `quick and safe` hotfix out straight to production

In such circumstances, you would want the ability to skip stages, which you can do with this structure when you trigger a new run

![](img/clean/promotion/c.jpg)

The approach motivated here ensures that changes from PR merges only make it as far as the development environment, with a nightly run being the primary way to get changes into QA, coupled with empowering the team to be able to run on demand to get things into QA. In this case however one has to be explicit in this intention by ticking the `Ignore scheduling rules` parameter.

![](img/clean/promotion/d.jpg)

> Having things change under the feet of a busy QA team is usually not a good idea and a motivation to give QA teams control of when to get things, however coupling this with nightly runs ensures that this does not become an entirely manual process.

[Environment approval gates](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass)) should also be considered. Recommendations
- Explicit approval requirements, where one more team members have to give the green light for promotion to UAT and Prod. Pay close attention to the duration you choose for the approval expiration.
- Consider business hours gates to control when promotion happens
- [Consider exclusive](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#exclusive-lock) locks to avoid contention of deployments. This is particularly useful for the development environment if you have all Pull Request merges resulting in deployments, where successive merges can trigger multiple deployments. An exclusive lock will allow only the first through and cancel all the rest except the last one. This is best used with a pipeline that has only one stage per environment, if you have multiple the exclusive lock kicks in on that too.

> ⚠️ Azure Pipelines currently lack a feature to cancel all pending approval requests but the latest or at least cancel all prior ones when a later one is approved. This would come in very handy. Manage this well to avoid a bunch of pending approvals. I also recommend making use of a variable and conditions that ensure that unless the team is in a release cycle, where a build is being stabilized for release, UAT and Prod are never considered at all, hence not triggering approval requests that will just be ignored.

Before you panic when you see your first approval blocking a pipeline run, note that Azure Pipelines smartly handles this by yielding back the agent used to run the pipeline. Once approval is given, the pipeline stages/jobs that follow will then be scheduled on another agent. Approvals can be pending for multiple days and that is not an issue at all.

![](img/clean/promotion/d.jpg)

![](img/clean/promotion/f.jpg)

![](img/clean/promotion/g.jpg)

A nice thing with approvals is that instead of business hours approval checks, you can also have control of when an approved deployment kicks off by scheduling it on approval. This feature is not available when using the Azure Pipelines extension in Microsoft Teams.

![](img/clean/promotion/h.jpg)

Consider the [Azure Pipelines integration with Microsoft Teams](https://learn.microsoft.com/en-us/azure/devops/pipelines/integrations/microsoft-teams?view=azure-devops) to receive notifications of approval requests and provide approvals directly from there.

![](img/clean/promotion/i.jpg)

![](img/clean/promotion/j.jpg)

## Screenshots of sample runs

**Manual run with default parameter values**

![](img/clean/promotion/k.jpg)

**Run with Ignore scheduling rules**

![](img/clean/promotion/l.jpg)

**Skipping the development environment**

![](img/clean/promotion/m.jpg)

**Branch control kicking in**

![](img/clean/promotion/n.jpg)

![](img/clean/promotion/o.jpg)

## What about Azure Releases?

You can mimic this by making use of the classic Azure Releases. However YAML vs ClickOps! Using YAML for defining your pipelines has several advantages:

- **Version Control**: Track changes to the pipeline configurations just as you do with source code.
- **Reusability**: Templates and parameters allow you to reuse and customize components across different projects or environments.
- **Transparency and Auditability**: Changes are visible and auditable through commit histories, enhancing security and compliance.
