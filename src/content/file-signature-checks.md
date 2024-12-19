---
layout: post
title: File Signature Checks in .NET
image: img/unsplash/jason-mavrommatis-8yYAaguVDgY-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-12-28T00:00:00.000Z
tags: [file signature, file validation, security]
draft: false
excerpt: Information on how to validate file signatures in .NET
---

Photo by <a href="https://unsplash.com/@jeisblack?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jason Mavrommatis</a> on <a href="https://unsplash.com/photos/green-metal-gate-with-brown-metal-padlock-8yYAaguVDgY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

# File Signature Checks in .NET

If you have an application that receives an file uploads, it is best practice to validate these files. It is common to see validation on extensions and mime types, although this is not fool proof and leaves lots of room for malicious files to be uploaded.

A more solid way to validate binary files is to check the unique header that each file type has, know as the magic number, that can be used to identify the type. For example if allowing PDF, you can verify that the signature matches that of a PDF. Depending on the file type, some will have more than one potential file signature.

In .NET [FileSignatures](https://github.com/neilharvey/FileSignatures) is a really good library for this and has a very simple API for identifying files. It covers a lot of files that you are most likely to encounter, like popular image and video formats, PDF, Excel/Word/PowerPoint/Open Office, Outlook messages, Zip files and more.

> Having started off reinventing the wheel using public domain information to verify signatures, it proved a bit hard as a lot of the sources were not complete. For example the information on [Wikipedia](https://en.wikipedia.org/wiki/List_of_file_signatures) states that a PDF will have the signature `%PDF-` or HEX `25 50 44 46 2D` which generally is correct as the first bytes will be `%PDF-[version number]`, except some PDF variants have no version and would just be `%PDF`. or HEX `25 50 44 46` This was one of many false negatives I was getting and on collating more information I came up with better checks, which happened to match what FileSignatures had when I stumbled upon it, giving confidence it was sufficiently battle tested. [This](https://github.com/Sicos1977/MSGReader/blob/master/MsgReaderCore/Helpers/FileTypeSelector.cs) was also a decent source of reliable signatures.

> If you are not working with .NET taking a look at the implementation and seeing what signatures are used can be a great start to hand roll something your self.

## Usage example

Think clean architecture and avoid the dependency leaking into your Domain and Use Cases by wrapping it in infrastructure.

Example Port:

```csharp
public interface IFileFormat
{
    /// <summary>
    /// Returns true if the file is a PDF by checking the file signature
    /// </summary>
    /// <param name="stream"></param>
    /// <returns></returns>
    bool IsPdf(Stream stream);
    /// <summary>
    /// Returns true if the file is an image by checking the file signature
    /// GIF, BMP, JPEG, PNG, WEBP, TIFF
    /// </summary>
    /// <param name="stream"></param>
    bool IsImage(Stream stream);
}
```

Example Infra:

```csharp
public class FileFormat : IFileFormat
{
    private readonly IFileFormatInspector _fileFormatInspector;

    public FileFormat(IFileFormatInspector fileFormatInspector) => _fileFormatInspector = fileFormatInspector;

    /// <summary>
    /// Returns true if the file is a PDF by checking the file signature
    /// </summary>
    /// <param name="stream"></param>
    /// <returns></returns>
    public bool IsPdf(Stream stream) => _fileFormatInspector.DetermineFileFormat(stream) is Pdf;

    /// <summary>
    /// Returns true if the file is an image by checking the file signature
    /// GIF, BMP, JPEG, PNG, WEBP, TIFF
    /// </summary>
    /// <param name="stream"></param>
    /// <returns></returns>
    public bool IsImage(Stream stream) => _fileFormatInspector.DetermineFileFormat(stream) is Image;
}

public static class FileSignatures
{
    /// <summary>
    /// Registers the file signatures service.
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddFileSignatures(this IServiceCollection services)
    {
        services.AddSingleton<IFileFormatInspector>(new FileFormatInspector());
        services.AddTransient<IFileFormat, FileFormat>();
        return services;
    }
}

// Registration in host
services.AddFileSignatures();
```

### Pro Tip

When working with File Signature checks you risk getting false negative for some file types as there may be so many variations in the wild. Do make sure to log any failures and include at least the first 10 bytes of that file, so that you do not have to follow up asking for files to be shared with you which can be annoying for user and at times hard do the sharing of sensitive information using insecure mediums.

Example

```csharp
    public override async Task<bool> Handle(ValidateFileUploadRequest request, CancellationToken cancellationToken)
    {
        using var __ = _logger.BeginScope(new Dictionary<string, object>
        {
            ["FileExtension"] = fileExtension,
            ["ContentType"] = request.ContentType,
            ["Header"] = GetFileHeader(request) // in case we get false negatives, we can investigate the file header and see if it's a valid file
        });
...
     if (!isValid)
         _logger.LogWarning("Uploaded file failed all validation.");
    }

    private static string GetFileHeader(ValidateFileUploadRequest request)
    {
        byte[] fileHeader;
        using (var reader = new BinaryReader(request.Stream, System.Text.Encoding.UTF8, leaveOpen: true))
        {
            // for investigation purposes, we read the first 10 bytes of the file and add to log context
            fileHeader = reader.ReadBytes(10); // safe, returns fewer bytes if the end of the stream is reached
            request.Stream.Position = 0;
        }

        return string.Join(", ", fileHeader.Select(b => $"0x{b:X2}"));
    }
```
