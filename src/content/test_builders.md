---
layout: post
title: Test Builder Pattern
image: img/unsplash/alan-rodriguez-rUtX6dvmCeM-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2021-01-30T10:00:00.000Z
tags: [.net]
draft: false
excerpt: test builders to deal with test maintenance hell
---

Photo by <a href="https://unsplash.com/@alan_rodriguez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alan Rodriguez</a> on <a href="https://unsplash.com/photos/rUtX6dvmCeM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

While working with DTOs and entities, particularly those that are used throughout your domain and boundaries, you will find that they are required in a multitude of tests. A natural approach is to call the constructor of each when required and hydrate them with required setup. While this is very easy and straightforward there are a couple of challenges. There is always a caveat.

To illustrate these challenges let us introduce an example of a simple domain object. Let's take a dumbed down conceptual take at a financial trade position, that has an identifier and monetary values for fixed and float legs.

> Investopedia defines a position as follows. A trade position is the amount of a security, commodity or currency which is owned by an individual, dealer, institution, or other fiscal entity.

The TradePosition properties will be as follows:

- A unique identifier of type `Guid`
- A floating leg notional of custom type `PositionValue`
- A fixed leg notional of type `PositionValue`

In turn the TradeValue properties will be as follows:

- A numeric value of type `double`
- A currency iso code of type `string`

```c#
    public record TradePosition(
        Guid Identifier,
        TradeValue FixedLegNotional,
        TradeValue FloatLegNotional);

    public record TradeValue(
        double Value,
        string CurrencyIsoCode);
```

Now what could go wrong with the simple approach? Well the following:

- As your solution grows and the trade position is used in hundreds of tests you may update the domain by say adding new properties that affect the ctor. In this case you need to update a multitude of tests manually.
- Over time you may change the meaning of certain things in the domain. For instance if we had maturity in the trade position and furthermore in the future we may want the aspects that determine maturity to change. Any tests that were created with a _'mature'_ trade position will also need to updated with this knowledge. This breaks a lot of principles, ideally the state and validity of an object should be self contained and if the outside has to understand inner workings to attain a given state that is a fail, and yes even for tests.
- In many cases you may simply want a trade position for the purposes of the test without a need for it to be in a specific state, but rather just to be valid. In this case you find code copy pasted all over the code base creating a bigger maintenance problem over time.

> Investopedia defines maturity as follows. The maturity is the date on which the principal amount of a note, draft, acceptance bond or other debt instrument becomes due.

### So, how do I solve this?

Let's start with another very tempting pattern that I have seen often. The following is a very simple **attempt** to address this problem.

```c#
    public class MediocreTradePositionBuilder
    {
        public static TradePosition CreateTradePosition(
            Guid identifier,
            TradeValue fixedLegNotional,
            TradeValue floatLegNotional
        )
        {
            ...
        }
    }
```

This does not really solve all the problems, or at least does so by introducing new ones. As our domain evolves and trade position/trade value grow then the method parameters here become messy. This particular case takes in TradeValue for the leg notionals, which means the test has to also build these and know about their inner workings, not great. One way around that is to accept the raw values further causing the parameters to blow up.

```c#
    public class MediocreTradePositionBuilder
    {
        public static TradePosition CreateTradePosition(
            Guid identifier,
            double fixedLegNotionalValue,
            string fixedLegNotionalCurrencyIsoCode,
            double floatLegNotionalValue,
            string floatLegNotionalCurrencyIsoCode
        )
        {
            ...
        }
    }
```

The biggest problems with this pattern however is that it does not communicate intention or evolve well. How do I build a trade position that is mature? The answer often then lies in the test, which is not great as this is an auxiliary concern and not the intent of the test. As you can have multiple scenarios also how does this work with this pattern? One way is to add more parameters to control this, gosh 🤦. Or maybe create multiple of these methods for each scenario. With this pattern I often find this code will still be copy pasted to add the flexibility, so naturally I am not promoting this one.

Finally the tests that use this pattern or none at all tend to be very long and messy to read. By looking at the code at a glance it is not possible to understand what the **arrange** stage is doing, worse still it makes it hard to distinguish clearly the **arrange** from the **act**.

### Get to it already, show me the way

Let's get straight to it and look at a different pattern in code.

```c#
    public class TradePositionBuilder : Builder<TradePosition>
    {
        public TradePositionBuilder WithIdentifier(Guid identifier)
        {
            Set(x => x.Identifier, identifier);
            return this;
        }

        public TradePositionBuilder WithFloatLegNotional(PositionValue positionValue)
        {
            Set(x => x.FloatLegNotional, positionValue);
            return this;
        }

        public TradePositionBuilder WithFixedLegNotional(PositionValue positionValue)
        {
            Set(x => x.FixedLegNotional, positionValue);
            return this;
        }

        public TradePositionBuilder ThatIsValid()
        {
            Set(x => x.Identifier, Guid.NewGuid());
            Set(x => x.FixedLegNotional, Some.PositionValue.ThatIsValid());
            Set(x => x.FloatLegNotional, Some.PositionValue.ThatIsValid());
            return this;
        }

        protected override TradePosition Build() => new TradePosition(
            Get(x => x.Identifier),
            Get(x => x.FixedLegNotional),
            Get(x => x.FixedLegNotional));
    }

    public class PositionValueBuilder : Builder<PositionValue>
    {

        public PositionValueBuilder WithCurrencyIsoCode(string currencyIsoCode)
        {
            Set(x => x.CurrencyIsoCode, currencyIsoCode);
            return this;
        }

        public PositionValueBuilder  WithValue(double value)
        {
            Set(x => x.Value, value);
            return this;
        }

        public PositionValueBuilder ThatIsValid()
        {
            Set(x => x.CurrencyIsoCode, "EUR");
            Set(x => x.Value, 1_500_000);
            return this;
        }

        protected override PositionValue Build()
          => new PositionValue(Get(x => x.Value), Get(x => x.CurrencyIsoCode));
    }
```

OK so why is this better? I'm glad you asked, here we go.

- **Communication of intent.** The methods we see here are very clear on what we are building and while we kept this simple, they can start to cater for scenario like a mature trade position with say 'ThatIsMatured' or an invalid trade with 'ThatIsInvalid'. This makes it easy in tests especially in scenarios where the trade position is not primary to the test but still required for the scenario.
- **Fluent.** Who does not love fluent code, this one makes this even easier to use and very natural to read. If there is anything you should strive for it is readable tests. Recall that when we ditched explicit documentation in code, we made an oath to write self documenting code, one of which is through tests, so they better be easy to read and understand.
- **Less code.** So if the auxiliary act of creating objects for our tests is not key to the tests why should that mess make the test hard to read? I would rather see `var tradePosition = A.TradePosition.ThatIsMature()` than see all the code that entails this. It is quite rare from a 'reading through test code' perspective that I even want to see that at all.
- **Ease of refactoring.** This approach isolates the actual creation of something to one place and one place only much like a factory. So now as your domain evolves and you change the meaning of things, ctors change, etc among many change and as far as your tests are concerned this change only needs to be done in one place.
- **Clean and simple.\*\*** In particular this caters very well for scenarios were you want a valid object without need to control the actual values. Now you do not need to have this copy pasted all over the place.

Let's see some usage examples:

```c#
    public class Sample
    {
        [Fact]
        public void Test()
        {
            // caters for the common scenario, you just need a valid trade position

            TradePosition tradePosition1 = A.TradePosition
                .ThatIsValid();

            // caters for scenario were you need to be in control of all properties
            TradePosition tradePsition2 = A.TradePosition
                .WithIdentifier(Guid.NewGuid())
                .WithFixedLegNotional(
                    // notice the chained builder here, very powerful!
                    Some.PositionValue
                        .WithValue(1_500_00)
                        .WithCurrencyIsoCode("EUR"))
                .WithFloatLegNotional(
                    Some.PositionValue
                        .WithValue(2_480_00)
                        .WithCurrencyIsoCode("EUR"));

            // caters for scenario where you care for single property
            // in your test but the rest also should be valid
            TradePosition tradePosition3 = A.TradePosition
                .WithIdentifier(Guid.NewGuid());
        }
    }
```

All things considered we can certainly say that this is both simple and powerful. Creating the builders is easy and the pattern fosters for clean code. Using the builders is also very intuitive and the fluent pattern further makes this a pleasure to use.

### Show me the guts

Let's have a look at what is going on behind the scenes to power this and to also understand some of the calls in the builder examples.

The first one is something that will not need to be changed often, if at all. You would have noticed the two builders above have a generic builder base class. The base class is as follows:

```c#
    public abstract class Builder<T>
    {
        private readonly Dictionary<string, object> _properties =
            new();

        protected abstract T Build();

        public static implicit operator T(Builder<T> builder)
        {
            return builder.Build();
        }

        /// <summary>
        /// Temporarily hold property value
        /// </summary>
        /// <typeparam name="TProp">Property type</typeparam>
        /// <param name="action">Property expression</param>
        /// <param name="value">Value to hold</param>
        public void Set<TProp>(Expression<Func<T, TProp>> action, TProp value)
        {
            var expression = (MemberExpression)action.Body;
            var name = expression.Member.Name;

            _properties[name] = value;
        }

        /// <summary>
        /// Get previously set value
        /// </summary>
        /// <typeparam name="TProp">Property type</typeparam>
        /// <param name="action">Property expression</param>
        /// <returns></returns>
        public TProp Get<TProp>(Expression<Func<T, TProp>> action)
        {
            var expression = (MemberExpression)action.Body;
            var name = expression.Member.Name;

            var exists = _properties.TryGetValue(name, out var value);

            return exists ? value as dynamic : default(TProp);
        }
    }
```

This base class has an abstract Build method returning the generic type. What this means is that if you have `TradePositionsBuilder: Builder\<TradePosition\>`, the implementation must have a build method returning a trade position. This makes sense to be enforced as that is the core purpose of the builder. More interestingly however you will notice that there is an implicit operator overload from the builder itself to the generic type that calls this build method. This allows us to use the builder and have it implicitly cast to the target type in the end, making for succinct code. An alternative would have been to explicitly call build.

> Whilst this pattern is simple, effort is made here clearly to make this as powerful out of the box as possible. As this is used in the practice take care to ensure patterns are observed especially the pain points of making builders and using them and address them as you go along.

You would have taken notice of the Get and Set methods that work with a backing dictionary. This is in place to further make creating your own builders easy. Remember that as someone uses your builder they call the fluent methods one at a time before the implicit call to build. That means the values for each property need to be saved somewhere until build is called. If you are working with mutable types like DTOs this is easy as you can create the object and set the properties for each call, however this cannot be for immutable types like domain objects and as you can guess I am promoting immutability wherever possible, so this has to be supported out of the box for my pattern. The builder can call set providing the property and value and call get providing property to get back the previously stored value. Have another look at the two builders above to see this more clearly. Behind the scenes Expressions are used to make this approach clean, easy and tied to whatever type the builder is returning via the generic use. From that the property name is used to store the values in the dictionary and to get them back all in an efficient and type safe manner.

If you were paying close attention you would have noticed the readability added by the use of the `A` and `Some` to give results like `A.TradePosition` and `Some.PositionValue` that conform to natural language. While optional this can be the cherry on the top to make the calls natural to read.

```c#
    public class A
    {
        public static TradePositionBuilder TradePosition => new TradePositionBuilder();
    }

    public class Some
    {
        public static PositionValueBuilder PositionValue => new PositionValueBuilder();
    }
```

Notice the use of `=>` and not `=`. This is intentional and care must be taken to do it this way. You want to ensure that each call to this property makes a new builder. This isolation for tests is essential especially considering that the builders have state.

> This pattern is very simple. However given that **1.** this involves _'only tests'_ and _2._ the problem does not seem that complex and pressing, this tends to be highly neglected. The consequences are however dire and do not discriminate because this is only tests. The amount of time lost to go around the challenges of not handling this problem properly can be great.

That's all folks!
