---
layout: post
title: How to Create SOAP Requests Using Postman
image: img/unsplash/mika-baumeister-WOn90Iui_08-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-03-09T10:00:00.000Z
tags: [SOAP, Postman, HTTP]
draft: false
excerpt: How to Create SOAP Requests Using Postman
---

Photo by <a href="https://unsplash.com/@mbaumi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mika Baumeister</a> on <a href="https://unsplash.com/photos/WOn90Iui_08?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# How to Create SOAP Requests Using Postman

Postman is a popular tool used to test APIs and make HTTP requests. It can also be used to make SOAP requests, which is a messaging protocol used to exchange structured information between web applications. In this blog post, I will guide you on how to create SOAP requests using Postman.

## Step 1: Enter Your SOAP Endpoint

To make a SOAP request, you will need to enter your SOAP endpoint URL in the address field of a new request tab in Postman. Select the POST method from the request method dropdown list. For example, we will use the following endpoint URL: `https://www.dataaccess.com/webservicesserver/NumberConversion.wso`

> [NumberConversion](https://www.dataaccess.com/webservicesserver/NumberConversion.wso) has a service, [NumberToWords](https://www.dataaccess.com/webservicesserver/NumberConversion.wso?op=NumberToWords), which returns the word corresponding to the positive number passed as parameter limited to quadrillions. Due to its simplicity we will use it in this example

## Step 2: Add Body Data

In the Body tab, select `raw` and choose `XML` from the dropdown list. Enter your XML in the text entry area. Your request body must include the `SOAP Envelope`, `Header`, and `Body` tags as required by the endpoint, as well as any namespaces. The data needs to include the name of the operation, together with any values you need to post to the service.

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>500</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>
```

## Step 3: Set Your Request Headers

When you select an `XML` body type, Postman automatically adds a `Content-Type` header of `application/xml`. However, depending on your service provider, you may need `text/xml` for some SOAP requests. Check with your SOAP service to decide which header is appropriate. If you need the `text/xml` header or otherwise, you will need to override the default setting added by Postman.

> You can also include the character set in the `Content-Type` header, for example, `text/xml; charset=utf-8`

For the number conversion SOAP API example, you need to change the content type header to text/xml. To set request headers, do the following:

- Open the request Headers. If the auto-generated headers are hidden, select the notice to display them.
- Deselect the `Content-Type` header Postman added automatically.
- Add a new row with `Content-Type` in the Key field and `text/xml` in the Value field.

## Step 4: Send Your Request

Select Send to make your call to the SOAP service. If your call is successful, Postman displays the response in the lower tab. You can inspect the response to verify that your SOAP request was processed correctly.

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <m:NumberToWordsResponse xmlns:m="http://www.dataaccess.com/webservicesserver/">
            <m:NumberToWordsResult>five hundred </m:NumberToWordsResult>
        </m:NumberToWordsResponse>
    </soap:Body>
</soap:Envelope>
```

In conclusion, Postman makes it easy to create SOAP requests and test SOAP APIs. By following the steps outlined in this blog post, you can make SOAP requests in Postman with ease.

Here is the complete curl you can import in Postman to skip the steps highlighted.

```curl
curl --location 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso' \
--header 'Content-Type: text/xml; charset=utf-8' \
--data '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>500</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>
'
```
