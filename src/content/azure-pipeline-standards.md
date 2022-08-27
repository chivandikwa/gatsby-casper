---
layout: post
title: Azure Pipelines Standards
image: img/clean/used/llama.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [azure, pipeline, cicd]
draft: false
excerpt: practices for disciplined CI/CD
---

# Azure Pipelines Standards and Practices

A list of recommendations around working with Azure Pipelines that can potentially be adopted by a team as standards. I highly recommend a team has very clear and explicit standards documented as below that are agreed upon and enforced.

## Creating pipelines

✅ **DO** create new pipelines in [YAML]([YAML schema reference | Microsoft Docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/?view=azure-pipelines), do not use the classic UI approach or CLI. Ensure that the YAML is part of your code repository. YAML is the preferred method for managing pipeline definitions, as it provides traceability for changes and can follow approval guidelines.

✅ **DO** add all pipelines to a specific folder in your repository i.e. `pipelines` and any archived ones to a relevant folder i.e. `pipelines\archived`.

✅ **DO** add shared variables to one or more [variable groups]([Variable groups for Azure Pipelines - Azure Pipelines | Microsoft Docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml)) to avoid having duplicated variables everywhere that require more effort to keep up to date.

> ℹ️ Add only variables that are truly global, that is you would require the same value for all pipelines that use this without the need to customize for a single pipeline. API keys to a third-party service or license keys are good examples. Variables that are unique to a given pipeline but require updates are best set up as local variables in the given pipeline or possibly parameters.

For example, importing and using a variable from a variable group

```yml
variables:

    - group: [Variable Group Name]

...
- task: Npm@1
  inputs:
      customCommand: "run lint -- $([Variable Name])"
```

✅ **DO** store 'secret' variables with the [right options enabled]([Set secret variables - Azure Pipelines | Microsoft Docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables?view=azure-devops&tabs=yaml%2Cbash)) to ensure that they are not visible as raw text. The default would be for Azure Pipelines to store variables as raw text.

✅ **DO** set the full pipeline as YAML. There are features that can be used together with YAML from the UI such as triggers and schedules, these should also be defined in the YAML.

> ℹ️ There are some reasonable exceptions to this rule, specifically something that will then need to be changed often.

✅ **DO** maintain an extensive [retention policy]([Retention policies for builds, releases, and test - Azure Pipelines | Microsoft Docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/policies/retention?view=azure-devops&tabs=yaml)) for pipeline runs. This is important to track run history over an extensive period for example to see if your test run performance is regressing, linting warnings are not increasing, the addition of tests in the solution is healthy, total pipeline run times are not regressing, etc.

✅ **DO** make use of the [matrix build strategy](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/jobs-job-strategy?view=azure-pipelines#strategy-matrix-maxparallel) when you have sections of the pipeline that are duplicated to run for a specific target, i.e. a pipeline that runs the same command but on same targets that end up with the same step duplicated for each target. The matrix strategy allows for creating a single step/stage and passing in the dynamic aspect, target in our example, as a variable.

Example: Target specific build agents

```yaml
strategy:
    matrix:
        [Matrix 1 Name]:
            [Variable Name]: ""
        [Matrix 1 Name]:
            [Variable Name]: ""

pool:
    demands:
        - agent.name -equals $([Variable Name])

steps:
	...
```

✅ **DO** make use of [Templates]([Templates - Azure Pipelines | Microsoft Docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops)) for any reusable content, logic and parameters. You can insert reusable content with a template or you can use a template to control what is allowed in a pipeline. The second approach is useful for [building secure pipelines with templates](https://docs.microsoft.com/en-us/azure/devops/pipelines/security/templates?view=azure-devops).

## Security

✅ **DO** properly scope any service connections and permissions to give the least privileges possible. Maintain very tight control of your administrators and service account groups with this principle in mind.

⛔ **DO NOT** give users generic or broad contributor rights to the Azure Pipelines.

✅ **DO** Use [service connections](https://docs.microsoft.com/en-us/azure/devops/organizations/security/security-best-practices?view=azure-devops#scope-service-connections) when possible. Service connections provide a secure mechanism to connect to assorted services without the need to pass in secret variables to the build directly. Restrict these connections to the specific place they should be used and nothing more.

✅ **DO** Block external guest access entirely by disabling the ["Allow invitations to be sent to any domain" policy](https://docs.microsoft.com/en-us/azure/active-directory/external-identities/allow-deny-list). It is a good idea to do so if there's no business need for it.

✅ **DO** consider at least one reviewer outside of the original requester for any changes made to pipelines. The approver takes co-ownership of the changes and should be held equally responsible for any impact it may have.

✅ **DO** require CI build to pass, which is useful for establishing baseline code quality, such as code linting, unit tests, and security checks like credential scans.

✅ **DO** lock down release pipelines by running them only on specific production branches. The release strategy can then be based on ensuring that the production branches are managed with diligence to ensure that they are 'sane' and have only what should be released.

✅ **DO** consider separating tasks into stages within a given pipeline. This allows one to run only specific parts of a pipeline on demand, useful flexibility, and additionally to rerun failed stages separately without having to rerun the entire pipeline.

✅ **DO** consider using Azure Dashboards or some external visualization tool to keep track of the health and state of your pipelines.

✅ **DO** consider using scheduled pipelines for scenarios where a pipeline is regularly run manually.

⛔ **DO NOT** use remotely fetched resources, but, if necessary, use versioning and hash checking.

⛔ **DO NOT** log secrets.

## Build agents

✅ **DO** Update pool machines regularly to ensure the build fleet isn’t running vulnerable code that can be exploited by a malicious actor. This includes updating the agent software and in a case where you manage the VMs yourself, ensuring that the OS is up to date with any security patches.

✅ **DO** consider leveraging multiple build agents to run multiple pipelines in parallel and where possible a single pipeline's steps/stages in parallel.

✅ **DO** favor Linux-based agents where at all possible. These are cheaper to requisition and benchmarks show that most tasks would run faster on these agents as compared to Windows.
