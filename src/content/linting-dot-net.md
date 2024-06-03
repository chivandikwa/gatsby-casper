---
layout: post
title: Linting in .NET
image: img/unsplash/tim-gouw-_U-x3_FYxfI-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-06-03T00:00:00.000Z
tags: [Linting, .NET, Roslyn]
draft: false
excerpt: Linting in .NET
---

Photo by <a href="https://unsplash.com/@punttim?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tim Gouw</a> on <a href="https://unsplash.com/photos/red-light-of-traffic-light-_U-x3_FYxfI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

# Linting in .NET

Utilizing Roslyn analyzers for linting in .NET projects offers a myriad of advantages that can significantly enhance code quality and developer productivity. Unlike external tools like SonarQube (which are great btw, and can also be used in combo with Roslyn), Roslyn analyzers provide a seamless integration directly into IDEs and the dotnet CLI, empowering developers to identify and rectify issues in real-time as they write code. This immediate feedback loop fosters a proactive approach to addressing potential bugs, adherence to coding standards, and best practices, resulting in cleaner, more maintainable codebases.

Moreover, Roslyn analyzers offer deep insights into code patterns specific to .NET, enabling developers to leverage language-specific optimizations and refactoring's effectively.

Linting of projects is generally best done early as you will not be overwhelmed with many pre-existing warnings on setting it up and risk getting numb to these. For .NET solutions it is a great idea to enable the `TreatWarningsAsErrors` in the beginning (ideally via a `Directory.Build.props` file) and you are never in too deep to do it later as you can use the `WarningsNotAsErrors` to ignore some and possibly `NoWarn` to suppress some from being in your build warnings, with care however to not suppress something you wish you had seen later. You can apply these overrides globally with a `Directory.Build.props` file or per project. You can also suppress things inline, although this is only useful when you have only a hand full of things to suppress. Example

```csharp
#pragma warning disable [Rule Code] // short comment explaining what is ignored
                    cfg.UseRetry(x => x.None());
#pragma warning restore [Rule Code] //
```

If `TreatWarningsAsErrors` is too harsh for your scenario you can instead replace the combo `TreatWarningsAsError` + `WarningsNotAsErrors` + `NoWarn` with `WarningsAsErrors` + `NoWarn` to target specific things.


If done well your pipeline should not be overwhelming with warnings and you IDE should reflect the same.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/linting-dotnet/a.png)


One really great thing about Roslyn is that if the analysis rule also has a fix, this shows up in the IDE and can be done conveniently. Even when working with 3rd party Analyzers, the IDE support is impressive.
![[Pasted image 20240419171537.png]]

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/linting-dotnet/b.png)

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/linting-dotnet/c.png)

Once you have configured the rules and build behavior, everything just works and concisely for you IDEs, CLI, and Pipeline runs.

# Analysis Rules

The default rule set is very relaxed as there are mostly not rights to some of the rules, like the ones around formatting and style, which however are important to have a consistent approach decided upfront and enforced. Out of the box this means you do not get too much from Roslyn and have to invest the upfront effort to actually configure these rules.

If you do not already have analysis setup, a good starting point to is to add a new .editorconfig file using the Visual Studio Solution context menu. This will add one that reflects the way your solution code already looks. You can author the rules by hand, or double click the file which will open a visualizer in Visual Studio.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/linting-dotnet/d.png)

Lean general rule recommendation as a starting point

```bash
root = true

[*]
guidelines = 120

# All files
[*]
indent_style = space
csharp_indent_labels = one_less_than_current
csharp_using_directive_placement = outside_namespace:silent
csharp_prefer_simple_using_statement = true:suggestion
csharp_prefer_braces = true:silent
csharp_style_namespace_declarations = file_scoped:warning
csharp_style_prefer_method_group_conversion = true:silent
csharp_style_prefer_top_level_statements = true:silent
csharp_style_expression_bodied_methods = true:suggestion
csharp_style_expression_bodied_constructors = false:silent
csharp_style_expression_bodied_operators = false:silent
csharp_style_expression_bodied_properties = true:silent
csharp_style_expression_bodied_indexers = true:silent
csharp_style_expression_bodied_accessors = true:silent
csharp_style_expression_bodied_lambdas = true:suggestion
csharp_style_expression_bodied_local_functions = false:suggestion
csharp_style_throw_expression = true:suggestion
csharp_style_prefer_null_check_over_type_check = true:suggestion
csharp_prefer_simple_default_expression = true:suggestion
csharp_style_prefer_local_over_anonymous_function = true:suggestion
csharp_style_prefer_index_operator = true:suggestion
csharp_style_prefer_range_operator = true:suggestion
csharp_style_implicit_object_creation_when_type_is_apparent = true:suggestion
csharp_style_prefer_tuple_swap = true:suggestion
csharp_style_prefer_utf8_string_literals = true:suggestion
csharp_style_inlined_variable_declaration = true:suggestion
csharp_style_deconstructed_variable_declaration = true:suggestion
csharp_style_unused_value_assignment_preference = discard_variable:warning
csharp_style_unused_value_expression_statement_preference = discard_variable:suggestion
csharp_space_around_binary_operators = before_and_after
dotnet_diagnostic.API1000.severity = error
dotnet_diagnostic.API1001.severity = error
dotnet_diagnostic.API1002.severity = suggestion

# disallow async void
dotnet_diagnostic.S3168.severity = error

# Xml files
[*.xml]
indent_size = 2

[*.{cs,vb}]
#### Naming styles ####

# Naming rules

dotnet_naming_rule.interface_should_be_begins_with_i.severity = suggestion
dotnet_naming_rule.interface_should_be_begins_with_i.symbols = interface
dotnet_naming_rule.interface_should_be_begins_with_i.style = begins_with_i

dotnet_naming_rule.types_should_be_pascal_case.severity = suggestion
dotnet_naming_rule.types_should_be_pascal_case.symbols = types
dotnet_naming_rule.types_should_be_pascal_case.style = pascal_case

dotnet_naming_rule.non_field_members_should_be_pascal_case.severity = suggestion
dotnet_naming_rule.non_field_members_should_be_pascal_case.symbols = non_field_members
dotnet_naming_rule.non_field_members_should_be_pascal_case.style = pascal_case

# Symbol specifications

dotnet_naming_symbols.interface.applicable_kinds = interface
dotnet_naming_symbols.interface.applicable_accessibilities = public, internal, private, protected, protected_internal, private_protected
dotnet_naming_symbols.interface.required_modifiers =

dotnet_naming_symbols.types.applicable_kinds = class, struct, interface, enum
dotnet_naming_symbols.types.applicable_accessibilities = public, internal, private, protected, protected_internal, private_protected
dotnet_naming_symbols.types.required_modifiers =

dotnet_naming_symbols.non_field_members.applicable_kinds = property, event, method
dotnet_naming_symbols.non_field_members.applicable_accessibilities = public, internal, private, protected, protected_internal, private_protected
dotnet_naming_symbols.non_field_members.required_modifiers =

# Naming styles

dotnet_naming_style.begins_with_i.required_prefix = I
dotnet_naming_style.begins_with_i.required_suffix =
dotnet_naming_style.begins_with_i.word_separator =
dotnet_naming_style.begins_with_i.capitalization = pascal_case

dotnet_naming_style.pascal_case.required_prefix =
dotnet_naming_style.pascal_case.required_suffix =
dotnet_naming_style.pascal_case.word_separator =
dotnet_naming_style.pascal_case.capitalization = pascal_case

dotnet_naming_style.pascal_case.required_prefix =
dotnet_naming_style.pascal_case.required_suffix =
dotnet_naming_style.pascal_case.word_separator =
dotnet_naming_style.pascal_case.capitalization = pascal_case
dotnet_style_operator_placement_when_wrapping = beginning_of_line
tab_width = 4
indent_size = 4
end_of_line = crlf
dotnet_style_coalesce_expression = true:suggestion
dotnet_style_null_propagation = true:suggestion
dotnet_style_prefer_is_null_check_over_reference_equality_method = true:suggestion
dotnet_style_prefer_auto_properties = true:silent
dotnet_style_object_initializer = true:suggestion
dotnet_style_collection_initializer = true:suggestion
dotnet_style_prefer_simplified_boolean_expressions = true:suggestion
dotnet_style_prefer_conditional_expression_over_assignment = true:silent
dotnet_style_prefer_conditional_expression_over_return = true:silent
dotnet_style_explicit_tuple_names = true:suggestion
dotnet_style_prefer_inferred_tuple_names = true:suggestion
dotnet_style_prefer_inferred_anonymous_type_member_names = true:suggestion
dotnet_style_prefer_compound_assignment = true:suggestion
dotnet_style_prefer_simplified_interpolation = true:suggestion
dotnet_style_namespace_match_folder = true:suggestion

# cancellation tokens must be forwarded to methods that accept them
dotnet_diagnostic.CA2016.severity = error
# cancellation tokens must come last in method signatures
dotnet_diagnostic.CA1068.severity = error
```

My recommended rules may be rather aggressive for an existing code base, but I cannot insist more for new code bases as a good start and as a team as errors pop up you can pivot and decide on your preferences, however the rules that pick up on security, vulnerabilities and bugs are best left aggressive as those are the ones that really add value. For legacy code bases, I recommend an incremental approach where you make a wish list of most important rules and slowly eat away at this, fixing those that are low risk/easy to test right away and potentially suppressing existing scenarios that are risking to apply with haste.
## 3rd Party Analyzers

Here are my GOTO recommendations

### [xUnit Analyzers](https://github.com/xunit/xunit.analyzers)

This one comes out of the box with xUnit, however it requires some investment to configure to server you.

Go through the analysis rules and see what makes sense with your team.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/linting-dotnet/e.png)

I prefer to make use of xUnit as a test framework, but not as an assertion framework and use Fluent Assertions for that.

Recommended rules

```bash
# Tests
# XFA001: Use FluentAssertions equivalent
dotnet_diagnostic.XFA001.severity = error

# xUnit1004: Test methods should not be skipped
dotnet_diagnostic.xUnit1004.severity = error

# xUnit1006: Theory methods should have parameters
dotnet_diagnostic.xUnit1006.severity = error

# xUnit1008: Test data attribute should only be used on a Theory
dotnet_diagnostic.xUnit1008.severity = error

# xUnit1013: Public method should be marked as test
dotnet_diagnostic.xUnit1013.severity = error

# xUnit1014: MemberData should use nameof operator for member name
dotnet_diagnostic.xUnit1014.severity = error

# xUnit1025: InlineData should be unique within the Theory it belongs to
dotnet_diagnostic.xUnit1025.severity = error

# xUnit1026: Theory methods should use all of their parameters
dotnet_diagnostic.xUnit1026.severity = error

# xUnit2000: Constants and literals should be the expected argument
dotnet_diagnostic.xUnit2000.severity = error

# xUnit2003: Do not use equality check to test for null value
dotnet_diagnostic.xUnit2003.severity = error

# xUnit2004: Do not use equality check to test for boolean conditions
dotnet_diagnostic.xUnit2004.severity = error

# xUnit2007: Do not use typeof expression to check the type
dotnet_diagnostic.xUnit2007.severity = error

# xUnit2008: Do not use boolean check to match on regular expressions
dotnet_diagnostic.xUnit2008.severity = error

# xUnit2009: Do not use boolean check to check for substrings
dotnet_diagnostic.xUnit2009.severity = error

# xUnit2010: Do not use boolean check to check for string equality
dotnet_diagnostic.xUnit2010.severity = error

# xUnit2012: Do not use Enumerable.Any() to check if a value exists in a collection
dotnet_diagnostic.xUnit2012.severity = error

# xUnit2011: Do not use empty collection check
dotnet_diagnostic.xUnit2011.severity = error

# xUnit2013: Do not use equality check to check for collection size.
dotnet_diagnostic.xUnit2013.severity = error

# xUnit2015: Do not use typeof expression to check the exception type
dotnet_diagnostic.xUnit2015.severity = error

# xUnit2017: Do not use Contains() to check if a value exists in a collection
dotnet_diagnostic.xUnit2017.severity = error

# xUnit2018: Do not compare an object's exact type to an abstract class or interface
dotnet_diagnostic.xUnit2018.severity = error

# xUnit2019: Do not use obsolete throws check to check for asynchronously thrown exception
dotnet_diagnostic.xUnit2019.severity = error
```

### [Fluent Assertions Analyzer](https://github.com/fluentassertions/fluentassertions.analyzers)

The first thing I recommend with this is ensuring that only Fluent Assertions can be used as an assertions framework.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/linting-dotnet/f.png)

As a bonus, if you had xUnit assertions, you can just click on any one of the new errors and use Roslyn to convert all your assertions to Fluent Assertions.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/linting-dotnet/g.png)

```bash
# Replace Xunit assertion with Fluent Assertions equivalent
dotnet_diagnostic.MFA001.severity = error

# Replace MSTests assertion with Fluent Assertions equivalent
dotnet_diagnostic.MFA002.severity = error

# Replace NUnit assertion with Fluent Assertions equivalent
dotnet_diagnostic.MFA003.severity = error
```

### [Roslynator](https://josefpihrt.github.io/docs/roslynator/category/guides/)

Roslynator is a set of code analysis tools for C#, powered by [Roslyn](https://github.com/dotnet/roslyn).


### [Sonar Analyzer](https://github.com/SonarSource/sonar-dotnet)

Saving the best for last. I think this is hands down my preferred Analyzer as it comes with really great rules and fixes, with a whooping [450+ rules](https://rules.sonarsource.com/csharp/). This one works really great when used with the Sonar Lint extension available in [multiple IDEs](https://www.sonarsource.com/products/sonarlint/)

The [documentation](https://rules.sonarsource.com/csharp/RSPEC-4136/) of the rules from Sonar is 1st class and goes a long way in helping a team get up to speed with anything that may be new to them.

### [dotnet format](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format)

This one is not really an Analyzer, but is a dotnet global tool, which comes shipped with any .NET SDK, 5 and beyond can be used to enforce formatting as well as Roslyn rules solution wide. This started off as a formatter and has grown to be more and it's name no longer serves it justice. On running this tool preferences will be read from an .editorconfig file, if present, otherwise a default set of preferences will be used.

Formatting is one of those things that can be tricky to have rigid gates on. Do you really want to block a PR due to a redundant line or additional space at the end of an expression? So some of these issues go ignored or unnoticed, but maybe once or twice a year it is good to just run this solution wide and get formatting to a clean slate before proceeding. On teams with good discipline, I have noticed that on doing this surprisingly there is quite a low number of formatting issues, biased though due to the high use of code generators which make things consistent.
