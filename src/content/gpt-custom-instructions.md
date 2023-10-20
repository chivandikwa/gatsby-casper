---
layout: post
title: Tailoring ChatGPT Responses with Custom Instructions
image: img/unsplash/jamie-templeton-6gQjPGx1uQw-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-10-20T00:00:00.000Z
tags: [chatgpt, custom instructions, gpt]
draft: false
excerpt: Tailoring ChatGPT Responses with Custom Instructions
---

Photo by <a href="https://unsplash.com/@jamietempleton?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jamie Templeton</a> on <a href="https://unsplash.com/photos/brown-wooden-plank-fence-with-this-way-signboard-6gQjPGx1uQw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


# Tailoring ChatGPT Responses with Custom Instructions

Artificial Intelligence (AI) has become an indispensable asset in various fields, including software engineering. One of the AI tools that stands out is ChatGPT, particularly due to its ability to understand and adapt to custom instructions provided by the user. This feature enhances the dialogue between the user and the AI, ensuring that the responses are tailored to the user's needs and expectations. This article dissects the custom instructions mechanism using a seasoned Software Engineering Technical Lead's instructions as a case study.

ChatGPT is designed to enhance the interaction between the user and the AI by taking into consideration two key questions:

1. What would you like ChatGPT to know about you to provide better responses?
1. How would you like ChatGPT to respond?

These questions are critical as they form the basis of the custom instructions that guide the AI in delivering precise and useful responses.

Consider a Software Engineering Technical Lead with rich expertise in a variety of technologies and methodologies. They provided the following detailed instructions to ChatGPT:

> What would you like ChatGPT to know about you to provide better responses?

```markdown
I'm a seasoned Software Engineering Technical Lead with expertise in .NET, TypeScript, React, and Kubernetes.

My cloud solutions proficiency spans AWS and Azure, especially Azure DevOps and Pipelines.

Currently I am operating out of the United Kingdom, I have a strong inclination towards Clean Architecture and the C4 model, underpinning my commitment to modular and scalable design principles.

Engineering excellence is at the heart of what I do, emphasizing best practices, robust security, and peak efficiency.

I'm deeply passionate about mentoring and fostering growth in others, always aiming to share knowledge and develop skills.

I champion reproducibility in operations, leaning heavily on infrastructure-as-code and comprehensive runbooks.

When it comes to testing, I lean towards xUnit, Moq, and Fluent Assertions to ensure robustness.

In my coding endeavours, I prioritize code that's both succinct and highly readable, striking the right balance for maintainability and understanding.
```

The example provides a detailed narrative of their professional background, expertise, and core values. This information is a treasure trove for ChatGPT, enabling it to align its responses with the user's technical acumen and professional ethos. The mention of specific technologies, methodologies, and geographical locations gives ChatGPT a context that is crucial in tailoring the responses.

> How would you like ChatGPT to respond?

```markdown
- Prioritize best practices and efficiency in all responses.
- Recognize my expertise and respond accordingly.
- Be complete and thorough.
- Recognize my expertise and respond accordingly.
- Go beyond the obvious; anticipate my needs and offer innovative solutions.
- Provide immediate, clear, and comprehensive answers and complete information.
- No need to mention that you are an AI, your constraints or the cut-off date.
- Enhance explanations with visual aids, especially using Plant UML when applicable.
- Enhance explanations with visual aids, especially using Plant UML when applicable.
- Whenever possible, cite the source of your information and furnish relevant links for further reading.
- When you are not sure or have low confidence about the response, state this explicitly
```

The instructions here are clear and precise, outlining the expectations on how ChatGPT should respond. It reflects a desire for professionalism, thoroughness, and a keen eye for innovation. The emphasis on visual aids like Plant UML underscores the importance of clarity and effective communication, which are paramount in collaborative environments.

There are also some nuances with how ChatGPT tends to respond that are addressed with these instructions.

Notice that an exit gate has been created for ChatGPT when it does not know the answer to try and avoid hallucinations.

# The Impact and Significance

The custom instructions significantly elevate the quality of interaction between the user and ChatGPT. They ensure that the responses are not just accurate but are also insightful, innovative, and reflective of best practices in the field. This case underscores how seasoned professionals can leverage custom instructions to enhance their interaction with ChatGPT, making it an invaluable asset in their professional toolkit.

# Conclusion

The journey of AI is about continuous evolution, and the custom instructions feature in ChatGPT is a significant milestone in this journey. By examining a real-world example, we see the profound impact that well-crafted instructions can have on the quality of interaction between the user and the AI. It sets the stage for a future where AI tools like ChatGPT become more intuitive, adaptable, and indispensable in professional settings.

More information on this feature available [here](https://openai.com/blog/custom-instructions-for-chatgpt).
