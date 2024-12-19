---
layout: post
title: Report on team activity for DevOps Pull Requests
image: img/unsplash/towfiqu-barbhuiya-Q69veNk1iJQ-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-12-28T00:00:00.000Z
tags: [pull requests, azure devops, reporting]
draft: false
excerpt: Learn how to report on team activity for DevOps Pull Requests
---

Photo by <a href="https://unsplash.com/@towfiqu999999?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Towfiqu barbhuiya</a> on <a href="https://unsplash.com/photos/person-in-blue-white-and-red-plaid-long-sleeve-shirt-reading-book-Q69veNk1iJQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

# Report on team activity for DevOps Pull Requests

The following PowerShell script, `GetPullRequestDetails`, is designed to retrieve and analyze pull request (PR) details from an Azure DevOps repository. By providing insights into the number of PRs created and reviewed by specified users, it aids in understanding team contributions over time and encouraging balance.

The function `GetPullRequestDetailsXX` takes four parameters:

- $org: The Azure DevOps organization name.
- $project: The project name within the organization.
- $repo: The repository name.
- $token: The Personal Access Token (PAT) for authentication.

## Creating a Personal Access Token (PAT)

To use this script, a PAT with appropriate permissions is required. Follow these steps to create a PAT:

- Navigate to Azure DevOps:
   - Go to your Azure DevOps organization URL (e.g., https://dev.azure.com/{your_organization}).

- Access User Settings:
  - Click on your profile picture in the upper-right corner and select "Personal access tokens".

- Create a New Token:
   - Click on "New Token".

- Set Token Details:

  - Name your token appropriately (e.g., "Pull Request Analysis Token").
   - Set the expiration period as required.

- Select Scopes:
   - Under "Scopes", select:
      - Code (Read) for reading repository data.
     - Code (Status) for accessing PR status information.

- Create and Copy Token:
   - Click "Create" and copy the generated token. Store it securely as it won't be shown again.


```powershell
function GetPullRequestDetails {
    param(
        [string]$org,
        [string]$project,
        [string]$repo,
        [string]$token
    )

    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f "test",$token)))
    # comma separated list of valid users, i.e @('one', 'two', 'three')
    $validUsers = @([USERS])
    $allPRs = @()
    $i = 0
    do {
        $uri = "https://dev.azure.com/$org/$project/_apis/git/repositories/$repo/pullRequests?api-version=5.0&`$top=100&`$skip=$i&searchCriteria.status=all"
        $i += 100
        Write-Output $uri
        $result = Invoke-RestMethod -Method Get -Uri $Uri -ContentType "application/json" -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)}
        $allPRs += $result.value
        if ($result.count -lt 100) {
            break
        }
    } while ($true)
    $endDate = (Get-Date).Date
    $startDate = $endDate.AddDays(-30)

    # Initialize hash tables for counts
    $createdPRsAllTime = @{}
    $createdPRsLast30Days = @{}
    $reviewedPRsAllTime = @{}
    $reviewedPRsLast30Days = @{}

    foreach ($user in $validUsers) {
        $createdPRsAllTime[$user] = 0
        $createdPRsLast30Days[$user] = 0
        $reviewedPRsAllTime[$user] = 0
        $reviewedPRsLast30Days[$user] = 0
    }

    foreach ($pr in $allPRs) {
        $creator = $pr.createdBy.displayName
        $reviewers = $pr.reviewers | Where-Object { $_.displayName -in $validUsers } | ForEach-Object { $_.displayName }
        $prCreationDate = [datetime]::Parse($pr.creationDate)

        # Handle creation
        if ($validUsers -contains $creator) {
            $createdPRsAllTime[$creator] += 1
            if ($prCreationDate -ge $startDate -and $prCreationDate -le $endDate) {
                $createdPRsLast30Days[$creator] += 1
            }
        }

        # Handle review
        foreach ($reviewer in $reviewers) {
            $reviewedPRsAllTime[$reviewer] += 1
            if ($prCreationDate -ge $startDate -and $prCreationDate -le $endDate) {
                $reviewedPRsLast30Days[$reviewer] += 1
            }
        }
    }

    # Output tables sorted by value in descending order
    Write-Output "All-time Created PRs by user:"
    $createdPRsAllTime.GetEnumerator() | Sort-Object Value -Descending | Format-Table -AutoSize

    Write-Output "Last 30 days Created PRs by user:"
    $createdPRsLast30Days.GetEnumerator() | Sort-Object Value -Descending | Format-Table -AutoSize

    Write-Output "All-time Reviewed PRs by user:"
    $reviewedPRsAllTime.GetEnumerator() | Sort-Object Value -Descending | Format-Table -AutoSize

    Write-Output "Last 30 days Reviewed PRs by user:"
    $reviewedPRsLast30Days.GetEnumerator() | Sort-Object Value -Descending | Format-Table -AutoSize

    Write-Output "Finish. Total Pull Request count: $($allPRs.Count)"
}


GetPullRequestDetails -org "[org name]" -project "[PROJECT NAME]" -repo "[REPO NAME]" -token "[PAT]"
```

## Key Operations

- Authentication:
   - The script encodes the PAT into a Base64 string for secure authorization in API requests.

- Fetching Pull Requests:
   - The script constructs a URI to request PR data from Azure DevOps, iterating through pages of results (up to 100 PRs per page) until all PRs are retrieved.

- Filtering and Counting PRs:
   - The script initializes hash tables to count PRs created and reviewed by specified users, both all-time and within the last 30 days.
   - It iterates through all PRs, updating counts based on PR creation and review activities.

- Output:
   - The script outputs sorted tables of PR counts for each user, distinguishing between all-time and the last 30 days.
