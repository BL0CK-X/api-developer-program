# The Blockchain API Developer Program

We made our <a href="https://docs.blockchainapi.com" target="_blank">API</a>.

Now we want to help you make yours.

## This is Easy

This is designed to be easy. Once you get it started, you just write the code and submit it as a binary! We'll help you in any way we can. Just <a href="https://dashboard.blockchainapi.com/#contact" target="_blank">contact us</a>.

## Intro Video and Tutorial

Here's the short video (5 minutes) introduction: https://youtu.be/X-g5OXVbv7g

We have more thorough video tutorial (55 minutes) that creates an API from beginning to end, and goes over important details: https://youtu.be/l5QgAL8OgbE

All the information in the video is contained within this README.

## Documentation

There is no UI right now for the API Developer Program besides our own API endpoints.

Documentation for all the necessary endpoints are documented here: https://docs.blockchainapi.com/#tag/Project

## Background

Anyone can make their own API already. However, if you do and you intend to make money off of it, 
you'll likely have to complete several steps that do not involve the core coding part you actually enjoy. 

For us, these steps include: managing a cluster of servers, managing a database, accepting payments, analyzing usage, 
managing user authentication, setting up a business bank account, initially operating at a loss before making money, 
creating and managing documentation, marketing the API, and growing the community.

That's a lot.

What if you could only focus on **the coding part** and still make money and preserve your IP?

That's what the purpose of this is. You write the code, you compile it to a binary, and you upload it to our platform.

We automatically create the documentation, manage user authentication, manage the payments, scale your code, and give you 
statistics of API usage so you can adjust accordingly. People already paying for our platform
 immediately have access to your functions, and then you make money every time a paying user calls your function. 

And we can't see your code because it's a binary file.

It's free to be a part of this program and add your functions. **You can't lose money. You can only make money.**

## The Mission

Enable developers to build a profitable API and focus *exclusively* on coding the fun stuff!

## How this Works

1) Create the project
2) Write the functions
3) Compile the binary
4) Verify the binary
5) Upload the binary
6) Get paid at the end of each month

We have a thorough Python example showing how to do all of this in the 
<a href="https://github.com/BL0CK-X/api-developer-program/tree/main/python-api" target="_blank">folder `python-api`</a>.

### How to share your API

Via our API, you can create a project, which is a mini-API. 

You then specify endpoints, which are functions in your script. 

And finally, you specify what the input the user should provide to that function, and what the function should output.

We use all of this information to both call your API and auto-generate documentation.

All of our methods are available for free via our API and are documented <a href="https://docs.blockchainapi.com/#tag/Project">here</a>.

### Languages you can use

All of them.

#### Python

We provide and will continue to support a complete Python example in the directory `python-api`. 

This directory includes the following:
- Using the Python wrapper to call our API to create projects and endpoints
- Complete cross-platform instructions for compiling the binary
- Complete cross-platform instructions for verifying the binary
- Using the Python wrapper to deploy the binary and test it

#### Any Language

However, you can really use any language. To create projects, create endpoints, and deploy your project, you simply 
need to call our public API, which you can do from any language. 

Then, to create the binary, you can use any language, as long as it is properly compiled to an executable. 
And as long as it is properly formatted to be executed in the format we expect. We specify this format in the README.md in the `python-api` directory.

We have created the `go-api` and `javascript-api` directories because we'd like you to contribute to them if you decide to build your API in these languages. (It's in your interest as well that more developers join our platform because they'll bring more paying users who could have interest in your API.)

In order to know what's necessary for these directories, please see the workflow of the `python-api` directory.

#### Go

In particular, the language `go` is of specific interest. This is because, per my understanding, <a href="https://stackoverflow.com/questions/12168873/cross-compile-go-on-osx">you can compile Go to a 
Linux binary</a>.

This is great for two reasons:
1) Currently, run the binaries on a Linux server. Thus, native Linux binaries will be faster than Windows/Mac binaries run on a Linux machine.
2) This means we use packages that help us run non-native binaries (Windows, Linux), and these packages sometimes have bugs. Thus, compiling for Linux will result in a less buggy and more predictable deployment experience.

### Tips and tricks

NOTE: Do **not** rely on file read/write operations, unless that file is included within the executable. We currently permit such operations, but this is insescure and we will soon disable this.

1) You should deploy twice, once to a debug project, and once to a production project. Please clearly mark your `Debug` project in the project name.
2) You should deploy frequently and ensure that your binary runs as expected. If you experience any issues, contact us!
3) Make incremental changes and deploy to ensure it works as expected.
4) Import packages close to where they are used (Python). Typical Python practice says to import packages all at the top, which is in general the best practice. 
However, because we run the binary compiled on Windows/Mac on Linux, there are sometimes unexpected errors. For example, I found that `import time` causes the binary to hang when run on Linux.
5) If your binary is just not running as expected, try compiling it for Linux. I'm more than happy to try and help you debug, however.

## Getting started

Our 'Hello world program' is included in the `main.py` program. It has an endpoint called `ping` which verifies that 
the binary is working, and an endpoint called `generate_public_key` which uses the `solana` package to generate a public
key starting with a specific string.

Instructions for getting started with this mini-API and deploying it are included in the `README.md` of the `python-api` folder.

We also have a video walk-through for this here.

## How you make money

For each of your functions, you specify how much one call to that costs in credits, from 1 to 100 credits. (If you want a value
outside of that range, let us know.)

### How we convert credits to dollars to pay you

When someone uses your function, you get paid based on what plan that user is on. This is because the plan that the user has activated
determines the cost per credit rate.

The table below maps the subscription type to the amount you would earn per 1k credits used.

Plan | Free Trial | $9 (R) | $9 (M) | $29 (R) | $29 (M) | $99 (R) | $99 (M) | $499 (R) | $499 (M) 
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- 
$ earned per 1k Credits | 0 | **0.9** | 0.9 | **0.29** | 0.58 | 0.198 | 0.396 | 0.0499 | 0.06

(R = reserved, M = metered.)

Example: A $29 plan first receives 100,000 reserved credits for the month.
The rate is $0.29 / 1k credits (29 / 100,000 * 1,000). After the user uses 100,000 credits for the month, they use credits
at the metered rate, which is $0.58 for the $29/mo plan.

As of 03/10, 53% of our users are on the $29 / mo plan and 37% of our users are on the $9 / mo plan. This comprises 90% of all of our users.

Most of these users also do not exceed their reserved credits for the month. Therefore, the most common dollar rate per 1k credits that you would receive
is $0.90 and $0.29.

NOTE: The first pay day might not be until 05/01. We do not yet have a system in place for making payouts. We'd also like your feedback on both how you get paid and how often you'd like to be paid. 

### What we take as a platform fee

Most platforms, like Apple's App Store, take a percentage fee in order to cover their costs.

Until 06/01, we plan on taking **no fee**. In other words, you keep 100% of the credits used when people use your functions.

#### Before 06/01

Note that this is subject to change before 06/01. There are a few reasons why we would make the change early:

1) The system is being abused in some capacity.
2) The platform gains so much traction that we need to take a fee in order to be able to afford to scale it.
3) Or we simply need to in order to remain profitable.

#### After 06/01

What type of fee we take and how we structure it is not yet determined.

What we can commit to is this: It will not cost money to start making money.

The future platform fee will be anywhere from 10% to 35% of the credits earned, with the most likely range of 20% to 30%. This fee will cover automatic documentation, user authentication, payment processing, serving your code via our API, and making the platform better.

However, it's really unclear what our costs will be and how this platform will play out. Thus, it's much simpler to just give developers 100% of what they earn at first, and use the data accumulated over time to determine pricing.

#### "Show me the incentives, and I will show you the outcome." - Charlie Munger

I write this section to those who might be worried about building on our platform because our fee is currently subject to change.

Let's assume we were a completely selfish agent that wanted to maximize profits.

We have two incentives in order for this platform to be successful:
1) Ensure developers on our platform are profitable.
2) Be profitable.

Although #2 could conflict with #1, we need *both* to be successful. If developers are not sufficiently profitable, they won't build on our platform.

Therefore, even in the case in which we were cold-blooded wolves, we have a very strong incentive to ensure that you make money and that we don't take an egregious fee.

Furthermore, the more money you make, the more profitable we are. Why is that? When you make more money, that implies you are providing value. Which brings more people to our platform, who then become paying users. And some of these then contribute to our developer program.

So the way I see it, is that we need to focus on #1, and then #2 will follow.

## Support

If you need support, <a href="https://dashboard.blockchainapi.com/#contact">contact us</a>!

## How To Contribute

Ways to help this project and help the marketplace grow:

- Contribute to this repository so people can easily compile and deploy in more languages
- Send us all of your feedback, feature requests, and support requests
- Create a sick API and make a ton of money!

## Status of the Developer Program

We are currently in a semi-private beta. This means that it is publicly accessible, but I am not widely announcing its availability to our users just yet.

I am currently contacting specific users who have expressed interest in this program.
